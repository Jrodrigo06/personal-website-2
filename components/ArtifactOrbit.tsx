"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Artifact } from "@/data/artifacts";
import { getEllipsePathString, getOrbitParams } from "@/lib/orbit";

interface ArtifactOrbitProps {
  artifacts: Artifact[];
}

export default function ArtifactOrbit({ artifacts }: ArtifactOrbitProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const orbits = useMemo(
    () => artifacts.map((artifact, i) => ({ artifact, params: getOrbitParams(i) })),
    [artifacts],
  );

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* central anchor — organizes the field without reading as a literal sun */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "7px",
          zIndex: 1,
        }}
      >
        <span
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "26px",
            height: "26px",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "0.5px solid var(--border-em)",
              boxShadow: "0 0 14px 2px rgba(142, 200, 106, 0.1)",
            }}
          />
          <span
            style={{
              width: "8px",
              height: "8px",
              background: "var(--text-accent)",
              transform: "rotate(45deg)",
            }}
          />
        </span>
        <span
          style={{
            fontSize: "var(--text-2xs)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-ghost)",
          }}
        >
          artifacts
        </span>
      </div>

      {size && (
        <>
          {/* guide trajectories — one SVG for the whole field. Rotation is
              baked into each ellipse's own `transform`, matching the node's
              path exactly (see getEllipsePathString's comment for why an
              ancestor CSS rotate isn't used here). */}
          <svg
            aria-hidden
            width={size.width}
            height={size.height}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            {orbits.map(({ artifact, params }) => {
              const { rx, ry, rotateDeg, centerX, centerY } = params;
              const cx = size.width / 2 + centerX;
              const cy = size.height / 2 + centerY;
              const isHovered = hoveredId === artifact.id;
              return (
                <ellipse
                  key={artifact.id}
                  cx={cx}
                  cy={cy}
                  rx={rx}
                  ry={ry}
                  transform={`rotate(${rotateDeg} ${cx} ${cy})`}
                  fill="none"
                  stroke={isHovered ? "var(--border-em)" : "var(--border)"}
                  strokeWidth="0.5"
                  strokeDasharray="3 4"
                  style={{ transition: "stroke 200ms ease" }}
                />
              );
            })}
          </svg>

          {orbits.map(({ artifact, params }) => {
            const { rx, ry, rotateDeg, centerX, centerY, durationS, delayS, reverse } = params;
            const cx = size.width / 2 + centerX;
            const cy = size.height / 2 + centerY;
            const pathStr = getEllipsePathString(cx, cy, rx, ry, rotateDeg);
            return (
              <a
                key={artifact.id}
                href={`/artifacts/${artifact.id}`}
                className="orbit-node"
                aria-label={`${artifact.id} — ${artifact.title}`}
                onMouseEnter={() => setHoveredId(artifact.id)}
                onMouseLeave={() => setHoveredId((cur) => (cur === artifact.id ? null : cur))}
                onFocus={() => setHoveredId(artifact.id)}
                onBlur={() => setHoveredId((cur) => (cur === artifact.id ? null : cur))}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  offsetPath: `path('${pathStr}')`,
                  offsetRotate: "0deg",
                  offsetDistance: reducedMotion ? "20%" : "0%",
                  animationName: reducedMotion ? "none" : "orbit-drift",
                  animationDuration: `${durationS}s`,
                  animationDelay: `${delayS}s`,
                  animationDirection: reverse ? "reverse" : "normal",
                }}
              >
                <span className="orbit-node-content">
                  <span className="orbit-dot" />
                  <span className="orbit-label">
                    {artifact.id} · {artifact.title}
                  </span>
                </span>
              </a>
            );
          })}
        </>
      )}
    </div>
  );
}
