"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { PhotoNode } from "@/data/photos";

interface PhotoConstellationProps {
  photos: PhotoNode[];
  className?: string;
}

// Virtual layout square the normalized 0..1 coords map onto.
const LAYOUT_SIZE = 1600;
// Pointer travel (px) beyond which a press counts as a drag, not a click.
const DRAG_THRESHOLD = 4;
// Uniform resting thumbnail size (px, square).
const NODE_SIZE = 80;
// Thumbnail size (px) reached on hover.
const HOVER_SIZE = 110;
// Hover scale-up factor.
const HOVER_SCALE = HOVER_SIZE / NODE_SIZE;
// Parallax strength — every photo drifts the same subtle amount.
const PARALLAX_FACTOR = 0.4;
// Max parallax shift (px) reached at the screen edges.
const MAX_SHIFT = 8;

const ACCENT_RGB = "142, 200, 106"; // var(--text-accent) as rgb for glow alpha

interface Pan {
  x: number;
  y: number;
}

interface DragStart {
  pointerX: number;
  pointerY: number;
  panX: number;
  panY: number;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

interface NodeProps {
  node: PhotoNode;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}

function ConstellationNode({
  node,
  parallaxX,
  parallaxY,
  isHovered,
  onEnter,
  onLeave,
  onClick,
}: NodeProps) {
  const x = useTransform(parallaxX, (v) => v * MAX_SHIFT * PARALLAX_FACTOR);
  const y = useTransform(parallaxY, (v) => v * MAX_SHIFT * PARALLAX_FACTOR);

  const glow = isHovered
    ? `0 0 34px 6px rgba(${ACCENT_RGB}, 0.45)`
    : `0 0 18px 2px rgba(${ACCENT_RGB}, 0.16)`;

  const zIndex = isHovered ? 10 : 2;
  const hitSize = HOVER_SIZE;

  return (
    <div
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onClick={onClick}
      style={{
        position: "absolute",
        left: `${node.x * LAYOUT_SIZE}px`,
        top: `${node.y * LAYOUT_SIZE}px`,
        // Hit box is larger than the tile so hover/click is forgiving.
        width: `${hitSize}px`,
        height: `${hitSize}px`,
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex,
        cursor: "pointer",
      }}
    >
      <motion.div
        style={{ x, y }}
        animate={{ scale: isHovered ? HOVER_SCALE : 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <div
          style={{
            width: `${NODE_SIZE}px`,
            height: `${NODE_SIZE}px`,
            borderRadius: "8px",
            overflow: "hidden",
            background: "var(--bg-surface)",
            border: isHovered
              ? "0.5px solid var(--border-em)"
              : "0.5px solid var(--border)",
            boxShadow: glow,
            transition: "box-shadow 220ms ease, border-color 220ms ease",
          }}
        >
          <Image
            src={node.thumb}
            alt={node.filename}
            width={NODE_SIZE}
            height={NODE_SIZE}
            sizes={`${HOVER_SIZE}px`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            draggable={false}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function PhotoConstellation({
  photos,
  className,
}: PhotoConstellationProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragStart = useRef<DragStart | null>(null);
  const movedRef = useRef(false);

  const [pan, setPan] = useState<Pan>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<PhotoNode | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Mean of all photo coords — the view centers here so clustered photos don't
  // leave large empty margins.
  const centroid = useMemo(() => {
    if (photos.length === 0) return { x: 0.5, y: 0.5 };
    let sx = 0;
    let sy = 0;
    for (const p of photos) {
      sx += p.x;
      sy += p.y;
    }
    return { x: sx / photos.length, y: sy / photos.length };
  }, [photos]);

  // Normalized cursor position (-1..1 from container center) drives parallax.
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);

  // Center the virtual layout within the container on mount / resize.
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const center = () => {
      const rect = el.getBoundingClientRect();
      setPan({
        x: rect.width / 2 - centroid.x * LAYOUT_SIZE,
        y: rect.height / 2 - centroid.y * LAYOUT_SIZE,
      });
    };
    center();
    window.addEventListener("resize", center);
    return () => window.removeEventListener("resize", center);
  }, [centroid]);

  // Esc closes the modal.
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const updateParallax = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      parallaxX.set(clamp((clientX - (rect.left + rect.width / 2)) / (rect.width / 2), -1, 1));
      parallaxY.set(clamp((clientY - (rect.top + rect.height / 2)) / (rect.height / 2), -1, 1));
    },
    [parallaxX, parallaxY],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      dragStart.current = {
        pointerX: e.clientX,
        pointerY: e.clientY,
        panX: pan.x,
        panY: pan.y,
      };
      movedRef.current = false;
      setIsDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [pan],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      updateParallax(e.clientX, e.clientY);
      const start = dragStart.current;
      if (!start) return;
      const dx = e.clientX - start.pointerX;
      const dy = e.clientY - start.pointerY;
      if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
        if (!movedRef.current) setHasInteracted(true);
        movedRef.current = true;
      }
      setPan({ x: start.panX + dx, y: start.panY + dy });
    },
    [updateParallax],
  );

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragStart.current = null;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }, []);

  const onContainerLeave = useCallback(() => {
    parallaxX.set(0);
    parallaxY.set(0);
    setHoveredIndex(null);
  }, [parallaxX, parallaxY]);

  const onNodeClick = useCallback((node: PhotoNode) => {
    // Suppress the click that ends a drag.
    if (movedRef.current) return;
    setSelected(node);
  }, []);

  if (photos.length === 0) {
    return (
      <div
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          background: "var(--bg)",
          fontSize: "11px",
          letterSpacing: "0.12em",
          color: "var(--text-ghost)",
        }}
      >
        no photos yet
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onContainerLeave}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        background: "var(--bg)",
        touchAction: "none",
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      {/* pan layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${LAYOUT_SIZE}px`,
          height: `${LAYOUT_SIZE}px`,
          transform: `translate(${pan.x}px, ${pan.y}px)`,
          zIndex: 1,
        }}
      >
        {photos.map((node, index) => (
          <ConstellationNode
            key={node.filename}
            node={node}
            parallaxX={parallaxX}
            parallaxY={parallaxY}
            isHovered={hoveredIndex === index}
            onEnter={() => {
              if (!isDragging) setHoveredIndex(index);
            }}
            onLeave={() =>
              setHoveredIndex((cur) => (cur === index ? null : cur))
            }
            onClick={() => onNodeClick(node)}
          />
        ))}
      </div>

      {/* intro explainer — how the map is built; fades out after the first drag */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 20,
          pointerEvents: "none",
          width: "min(360px, 78vw)",
          padding: "22px 26px",
          textAlign: "center",
          background: "color-mix(in srgb, var(--bg-surface) 78%, transparent)",
          border: "0.5px solid var(--border)",
          borderRadius: "12px",
          backdropFilter: "blur(6px)",
          opacity: hasInteracted ? 0 : 1,
          transition: "opacity 0.6s ease",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-ghost)",
          }}
        >
          how this photo map is arranged
        </div>
        <p
          style={{
            margin: "10px 0 0",
            fontSize: "13px",
            lineHeight: 1.5,
            color: "var(--text-body)",
          }}
        >
          A neural network (<span style={{ color: "var(--text-accent)" }}>CLIP</span>)
          reads every photo into a 512-dimension embedding, and{" "}
          <span style={{ color: "var(--text-accent)" }}>UMAP</span> folds those down
          to this 2D map, so visually similar photos cluster together.
        </p>
        <div
          style={{
            marginTop: "16px",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-dim)",
          }}
        >
          drag to explore
        </div>
      </div>

      {/* full-photo modal */}
      {selected && (
        <div
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            background: "color-mix(in srgb, var(--bg) 88%, transparent)",
            cursor: "default",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelected(null);
            }}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              fontSize: "11px",
              padding: "6px 16px",
              borderRadius: "20px",
              background: "var(--bg-card)",
              color: "var(--text-accent)",
              border: "0.5px solid var(--border)",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            close ✕
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(90vw, 1400px)",
              height: "min(85vh, 1000px)",
            }}
          >
            <Image
              src={selected.display}
              alt={selected.filename}
              fill
              sizes="90vw"
              style={{ objectFit: "contain" }}
              draggable={false}
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
