"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { PhotoNode } from "@/data/photos";

interface PhotoConstellationProps {
  photos: PhotoNode[];
  className?: string;
}

// Virtual layout square the normalized 0..1 coords map onto.
const LAYOUT_SIZE = 1600;
// Pointer travel (px) beyond which a press counts as a drag, not a click.
const DRAG_THRESHOLD = 4;
// Hover thumbnail tile size (px, longest edge).
const TILE = 132;

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

function tileSize(node: PhotoNode): { w: number; h: number } {
  const ratio = node.width > 0 && node.height > 0 ? node.width / node.height : 1;
  return ratio >= 1
    ? { w: TILE, h: Math.round(TILE / ratio) }
    : { w: Math.round(TILE * ratio), h: TILE };
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
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selected, setSelected] = useState<PhotoNode | null>(null);

  // Center the virtual layout within the container on mount / resize.
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const center = () => {
      const rect = el.getBoundingClientRect();
      setPan({
        x: (rect.width - LAYOUT_SIZE) / 2,
        y: (rect.height - LAYOUT_SIZE) / 2,
      });
    };
    center();
    window.addEventListener("resize", center);
    return () => window.removeEventListener("resize", center);
  }, []);

  // Esc closes the modal.
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

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

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const start = dragStart.current;
    if (!start) return;
    const dx = e.clientX - start.pointerX;
    const dy = e.clientY - start.pointerY;
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      movedRef.current = true;
    }
    setPan({ x: start.panX + dx, y: start.panY + dy });
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragStart.current = null;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }, []);

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
      {/* overline */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          zIndex: 2,
          fontSize: "10px",
          letterSpacing: "0.12em",
          color: "var(--text-ghost)",
          pointerEvents: "none",
        }}
      >
        constellation · {photos.length} frames
      </div>

      {/* pan layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${LAYOUT_SIZE}px`,
          height: `${LAYOUT_SIZE}px`,
          transform: `translate(${pan.x}px, ${pan.y}px)`,
        }}
      >
        {photos.map((node) => {
          const isHovered = hoveredId === node.filename;
          const left = node.x * LAYOUT_SIZE;
          const top = node.y * LAYOUT_SIZE;
          const { w, h } = tileSize(node);
          return (
            <div
              key={node.filename}
              onPointerEnter={() => {
                if (!isDragging) setHoveredId(node.filename);
              }}
              onPointerLeave={() =>
                setHoveredId((cur) => (cur === node.filename ? null : cur))
              }
              onClick={() => onNodeClick(node)}
              style={{
                position: "absolute",
                left: `${left}px`,
                top: `${top}px`,
                transform: "translate(-50%, -50%)",
                zIndex: isHovered ? 3 : 1,
                cursor: "pointer",
              }}
            >
              {isHovered ? (
                <div
                  style={{
                    width: `${w}px`,
                    height: `${h}px`,
                    borderRadius: "6px",
                    overflow: "hidden",
                    background: "var(--bg-surface)",
                    border: "0.5px solid var(--border-em)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
                  }}
                >
                  <Image
                    src={node.thumb}
                    alt={node.filename}
                    width={w}
                    height={h}
                    sizes={`${TILE}px`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    draggable={false}
                  />
                </div>
              ) : (
                <span
                  style={{
                    display: "block",
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "var(--text-dim)",
                  }}
                />
              )}
            </div>
          );
        })}
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
