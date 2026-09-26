import Link from "next/link";
import { photos } from "@/data/photos";
import SectionHeader from "@/components/ui/SectionHeader";

// Sample up to N evenly-spaced nodes so the preview band reads as a constellation
// without rendering all frames.
const PREVIEW_COUNT = 36;
const BAND_HEIGHT = 132;

function previewNodes() {
  if (photos.length <= PREVIEW_COUNT) return photos;
  const stride = photos.length / PREVIEW_COUNT;
  return Array.from({ length: PREVIEW_COUNT }, (_, i) => photos[Math.floor(i * stride)]);
}

export default function PhotosTeaser() {
  const nodes = previewNodes();

  return (
    <div style={{ padding: "24px 0" }}>
      <SectionHeader label="photos" />

      {/* preview band — links through to the full constellation */}
      <Link href="/photos" className="arrow-link" style={{ display: "block", textDecoration: "none" }}>
        <div
          className="hover-frame"
          style={{
            position: "relative",
            marginTop: "14px",
            height: `${BAND_HEIGHT}px`,
            background: "var(--bg-surface)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {nodes.map((node, i) => (
            <span
              key={node.filename}
              className="photo-dot"
              style={{
                position: "absolute",
                left: `${6 + node.x * 88}%`,
                top: `${12 + node.y * 76}%`,
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "var(--text-dim)",
                animationDelay: `${-(i * 0.7).toFixed(2)}s`,
                animationDuration: `${8 + (i % 5)}s`,
              }}
            />
          ))}

          {/* call to action */}
          <span
            style={{
              position: "absolute",
              right: "16px",
              bottom: "14px",
              fontSize: "var(--text-xs)",
              color: "var(--text-accent)",
            }}
          >
            explore photos <span className="link-arrow link-arrow--ne">↗</span>
          </span>
        </div>
      </Link>
    </div>
  );
}
