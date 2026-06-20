"""Embed photos for the photo constellation visualization.

Pipeline:
  1. Discover JPGs in public/photos/raw/.
  2. CLIP (openai/clip-vit-base-patch32) -> 512-dim embedding per image (cached).
  3. UMAP -> 2D (x, y) per image, normalized to 0..1 (always recomputed).
  4. Resize each image into two committed sizes: thumb (~400px) and display (~1600px).
  5. Emit public/photos/photos.json (canonical) and a generated data/photos.ts (typed).

Embeddings are cached by name:mtime:size in scripts/.cache/embeddings.npz so re-runs
only embed new/changed photos. Bare `python scripts/embed_photos.py` works with defaults.
"""

from __future__ import annotations

import argparse
import json
import time
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps

# Repo root = parent of the scripts/ directory this file lives in.
ROOT = Path(__file__).resolve().parent.parent
DEFAULT_RAW = ROOT / "public" / "photos" / "raw"
DEFAULT_THUMBS = ROOT / "public" / "photos" / "thumbs"
DEFAULT_DISPLAY = ROOT / "public" / "photos" / "display"
DEFAULT_JSON = ROOT / "public" / "photos" / "photos.json"
DEFAULT_TS = ROOT / "data" / "photos.ts"
DEFAULT_CACHE = ROOT / "scripts" / ".cache" / "embeddings.npz"

CLIP_MODEL = "openai/clip-vit-base-patch32"
IMAGE_EXTS = {".jpg", ".jpeg"}


# --------------------------------------------------------------------------- #
# Discovery
# --------------------------------------------------------------------------- #
def discover_images(raw_dir: Path) -> list[Path]:
    """All JPGs in raw_dir (case-insensitive ext), sorted for stable order."""
    if not raw_dir.is_dir():
        raise FileNotFoundError(f"raw dir not found: {raw_dir}")
    paths = [
        p for p in raw_dir.iterdir() if p.is_file() and p.suffix.lower() in IMAGE_EXTS
    ]
    return sorted(paths, key=lambda p: p.name.lower())


def output_basename(path: Path) -> str:
    """Lowercase `.jpg` basename for committed assets (Linux prod is case-sensitive)."""
    return f"{path.stem.lower()}.jpg"


# --------------------------------------------------------------------------- #
# Embedding cache
# --------------------------------------------------------------------------- #
def cache_key(path: Path) -> str:
    st = path.stat()
    return f"{path.name}:{int(st.st_mtime)}:{st.st_size}"


def load_cache(cache_path: Path) -> dict[str, np.ndarray]:
    if not cache_path.exists():
        return {}
    with np.load(cache_path, allow_pickle=False) as data:
        return {k: data[k] for k in data.files}


def save_cache(cache_path: Path, cache: dict[str, np.ndarray]) -> None:
    cache_path.parent.mkdir(parents=True, exist_ok=True)
    np.savez(cache_path, **cache)


# --------------------------------------------------------------------------- #
# CLIP
# --------------------------------------------------------------------------- #
def load_clip():
    import torch
    from transformers import CLIPModel, CLIPProcessor

    model = CLIPModel.from_pretrained(CLIP_MODEL)
    model.eval()
    processor = CLIPProcessor.from_pretrained(CLIP_MODEL)
    torch.set_grad_enabled(False)
    return model, processor


def _image_embeds(model, feats) -> np.ndarray:
    """Coerce CLIP get_image_features output into a projected [n, 512] numpy array.

    Across transformers versions this method may return a bare tensor, a
    CLIPOutput-style object (image_embeds), or a raw BaseModelOutputWithPooling —
    in the last case we project pooler_output ourselves, exactly as
    get_image_features does internally.
    """
    if hasattr(feats, "detach"):
        tensor = feats
    else:
        tensor = getattr(feats, "image_embeds", None)
        if tensor is None:
            pooled = getattr(feats, "pooler_output", None)
            if pooled is None:
                pooled = feats[1]
            # Older transformers return the vision hidden size (768) here and
            # expect us to project; transformers v5+ already returns the
            # projected joint-embedding dim (512). Only project when the dims
            # demand it, otherwise pooled is the final embedding.
            if pooled.shape[-1] == model.visual_projection.in_features:
                tensor = model.visual_projection(pooled)
            else:
                tensor = pooled
    arr = tensor.detach().cpu().numpy().astype(np.float32)
    return arr.reshape(arr.shape[0], -1)


def embed_image(model, processor, path: Path) -> np.ndarray:
    with Image.open(path) as img:
        img = ImageOps.exif_transpose(img).convert("RGB")
        inputs = processor(images=img, return_tensors="pt")
    feats = model.get_image_features(**inputs)
    vec = _image_embeds(model, feats)[0]
    norm = np.linalg.norm(vec)
    if norm > 0:
        vec = vec / norm
    return vec.astype(np.float32)


def compute_embeddings(
    paths: list[Path], cache: dict[str, np.ndarray], force: bool, model, processor
) -> tuple[np.ndarray, int, int]:
    """Return (matrix [n,512], n_embedded, n_cached). Prunes stale cache keys."""
    keys = [cache_key(p) for p in paths]

    vectors: list[np.ndarray] = []
    n_embedded = n_cached = 0
    for path, key in zip(paths, keys):
        if not force and key in cache:
            vectors.append(cache[key])
            n_cached += 1
        else:
            print(f"  embedding {path.name}")
            vec = embed_image(model, processor, path)
            cache[key] = vec
            vectors.append(vec)
            n_embedded += 1

    # Prune cache entries no longer referenced by the current photo set.
    live = set(keys)
    for stale in [k for k in cache if k not in live]:
        del cache[stale]

    # Flatten each embedding to 1-D before stacking so the matrix is always
    # [n, 512]. Cached or freshly-computed vectors can carry a stray batch axis
    # (e.g. (1, 512)) depending on the transformers version; without this UMAP
    # sees a 3-D array and rejects it.
    matrix = np.vstack([np.asarray(v, dtype=np.float32).reshape(-1) for v in vectors])
    return matrix, n_embedded, n_cached


# --------------------------------------------------------------------------- #
# Layout
# --------------------------------------------------------------------------- #
def run_umap(embeddings: np.ndarray, seed: int) -> np.ndarray:
    import umap

    n = embeddings.shape[0]
    if n < 3:
        # UMAP needs a few points; fall back to a simple spread.
        return np.column_stack([np.linspace(0.0, 1.0, n), np.full(n, 0.5)]).astype(
            np.float32
        )

    reducer = umap.UMAP(
        n_neighbors=min(15, n - 1),
        min_dist=0.1,
        metric="cosine",
        random_state=seed,
    )
    return reducer.fit_transform(embeddings)


def normalize_coords(coords: np.ndarray) -> np.ndarray:
    """Per-axis min-max into 0..1; guard zero range."""
    out = np.zeros_like(coords, dtype=np.float64)
    for axis in range(coords.shape[1]):
        col = coords[:, axis]
        lo, hi = float(col.min()), float(col.max())
        out[:, axis] = (col - lo) / (hi - lo) if hi > lo else 0.5
    return out


# --------------------------------------------------------------------------- #
# Image resizing
# --------------------------------------------------------------------------- #
def make_image(
    src: Path, out_dir: Path, basename: str, width: int, quality: int, force: bool
) -> tuple[int, int]:
    """Write a width-capped progressive JPEG. Return source intrinsic (w, h)."""
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / basename
    with Image.open(src) as img:
        img = ImageOps.exif_transpose(img).convert("RGB")
        full_w, full_h = img.size
        fresh = (
            out_path.exists()
            and not force
            and out_path.stat().st_mtime >= src.stat().st_mtime
        )
        if not fresh:
            resized = img.copy()
            resized.thumbnail((width, width * 10), Image.LANCZOS)
            resized.save(
                out_path, "JPEG", quality=quality, progressive=True, optimize=True
            )
    return full_w, full_h


# --------------------------------------------------------------------------- #
# Manifest + outputs
# --------------------------------------------------------------------------- #
def build_manifest(
    paths: list[Path],
    coords: np.ndarray,
    dims: list[tuple[int, int]],
) -> list[dict]:
    manifest: list[dict] = []
    seen: set[str] = set()
    for path, (x, y), (w, h) in zip(paths, coords, dims):
        base = output_basename(path)
        if base in seen:
            raise ValueError(f"duplicate output basename after lowercasing: {base}")
        seen.add(base)
        manifest.append(
            {
                "filename": base,
                "thumb": f"/photos/thumbs/{base}",
                "display": f"/photos/display/{base}",
                "x": round(float(x), 5),
                "y": round(float(y), 5),
                "width": int(w),
                "height": int(h),
            }
        )
    manifest.sort(key=lambda e: e["filename"])
    return manifest


def write_outputs(
    manifest: list[dict],
    json_path: Path,
    ts_path: Path,
) -> None:
    json_path.parent.mkdir(parents=True, exist_ok=True)
    json_path.write_text(
        json.dumps({"photos": manifest}, indent=2) + "\n",
        encoding="utf-8",
    )

    ts_path.parent.mkdir(parents=True, exist_ok=True)
    photo_entries = json.dumps(manifest, indent=2)
    ts = (
        "// AUTO-GENERATED by scripts/embed_photos.py — do not edit by hand.\n"
        "// Run `python scripts/embed_photos.py` to regenerate.\n\n"
        "export interface PhotoNode {\n"
        "  filename: string;\n"
        "  thumb: string;\n"
        "  display: string;\n"
        "  x: number;\n"
        "  y: number;\n"
        "  width: number;\n"
        "  height: number;\n"
        "}\n\n"
        f"export const photos: PhotoNode[] = {photo_entries};\n"
    )
    ts_path.write_text(ts, encoding="utf-8")


# --------------------------------------------------------------------------- #
# Main
# --------------------------------------------------------------------------- #
def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Embed photos for the constellation.")
    p.add_argument("--raw-dir", type=Path, default=DEFAULT_RAW)
    p.add_argument("--thumbs-dir", type=Path, default=DEFAULT_THUMBS)
    p.add_argument("--display-dir", type=Path, default=DEFAULT_DISPLAY)
    p.add_argument("--json-out", type=Path, default=DEFAULT_JSON)
    p.add_argument("--ts-out", type=Path, default=DEFAULT_TS)
    p.add_argument("--cache", type=Path, default=DEFAULT_CACHE)
    p.add_argument("--thumb-width", type=int, default=400)
    p.add_argument("--display-width", type=int, default=1600)
    p.add_argument("--thumb-quality", type=int, default=82)
    p.add_argument("--display-quality", type=int, default=85)
    p.add_argument("--seed", type=int, default=42)
    p.add_argument("--force", action="store_true", help="ignore caches; rebuild all")
    return p.parse_args()


def main() -> None:
    args = parse_args()
    start = time.time()

    paths = discover_images(args.raw_dir)
    if not paths:
        print(f"no images found in {args.raw_dir}")
        return
    print(f"found {len(paths)} images in {args.raw_dir}")

    print(f"loading CLIP ({CLIP_MODEL}) …")
    model, processor = load_clip()

    cache = {} if args.force else load_cache(args.cache)
    embeddings, n_embedded, n_cached = compute_embeddings(
        paths, cache, args.force, model, processor
    )
    save_cache(args.cache, cache)

    print("running UMAP …")
    coords = normalize_coords(run_umap(embeddings, args.seed))

    print("generating thumbnails + display images …")
    dims: list[tuple[int, int]] = []
    for path in paths:
        base = output_basename(path)
        make_image(
            path,
            args.thumbs_dir,
            base,
            args.thumb_width,
            args.thumb_quality,
            args.force,
        )
        wh = make_image(
            path,
            args.display_dir,
            base,
            args.display_width,
            args.display_quality,
            args.force,
        )
        dims.append(wh)

    manifest = build_manifest(paths, coords, dims)

    write_outputs(manifest, args.json_out, args.ts_out)

    elapsed = time.time() - start
    print(
        f"done: {len(manifest)} photos "
        f"({n_embedded} embedded, {n_cached} cached) in {elapsed:.1f}s\n"
        f"  -> {args.json_out}\n"
        f"  -> {args.ts_out}"
    )


if __name__ == "__main__":
    main()
