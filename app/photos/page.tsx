import Link from "next/link";
import PhotoConstellation from "@/components/PhotoConstellation";
import { photos } from "@/data/photos";

export default function PhotosPage() {
  return (
    <main style={{ position: "relative", width: "100%", height: "100dvh" }}>
      {/* header overlay */}
      <div
        className="flex items-center justify-between"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: "20px 28px",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "var(--text-ghost)",
            }}
          >
            constellation · {photos.length} frames
          </span>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 500,
              fontFamily: "var(--font-serif)",
              color: "var(--text-h1)",
              letterSpacing: "-0.025em",
              lineHeight: 1,
            }}
          >
            Photos
          </h1>
        </div>
        <Link
          href="/"
          style={{
            pointerEvents: "auto",
            fontSize: "11px",
            padding: "6px 16px",
            borderRadius: "20px",
            background: "var(--bg-card)",
            color: "var(--text-accent)",
            border: "0.5px solid var(--border)",
          }}
        >
          ← back
        </Link>
      </div>

      <PhotoConstellation photos={photos} />
    </main>
  );
}
