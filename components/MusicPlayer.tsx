"use client";

import { useEffect, useRef, useState } from "react";

export interface PlayerTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  youtubeId: string;
}

interface MusicPlayerProps {
  tracks: PlayerTrack[];
}

const WAVE_BARS = [0, 1, 2, 3, 4, 5];

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Trim long titles down for the compact selector at the bottom.
function shortName(name: string): string {
  const base = name
    .split("/")[0]
    .replace(/[?.!]+$/, "")
    .trim();
  if (base.length <= 14) return base;
  const cut = base.slice(0, 14);
  const lastSpace = cut.lastIndexOf(" ");
  const trimmed = lastSpace > 6 ? cut.slice(0, lastSpace) : cut;
  return `${trimmed.trimEnd()}…`;
}

export default function MusicPlayer({ tracks }: MusicPlayerProps) {
  const playerRef = useRef<YT.Player | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const stopPolling = () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const startPolling = () => {
      stopPolling();
      intervalRef.current = setInterval(() => {
        const player = playerRef.current;
        if (!player) return;
        setCurrentTime(player.getCurrentTime());
        setDuration(player.getDuration());
      }, 500);
    };

    const createPlayer = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId: tracks[0]?.youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            const player = playerRef.current;
            if (player) setDuration(player.getDuration());
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            const state = event.data;
            const PlayerState = window.YT.PlayerState;
            if (state === PlayerState.PLAYING) {
              setIsPlaying(true);
              startPolling();
            } else if (state === PlayerState.PAUSED) {
              setIsPlaying(false);
              stopPolling();
            } else if (state === PlayerState.ENDED) {
              setIsPlaying(false);
              setCurrentTime(0);
              stopPolling();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      stopPolling();
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [tracks]);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;
    if (isPlaying) player.pauseVideo();
    else player.playVideo();
  };

  const selectTrack = (i: number) => {
    if (i === activeIndex) {
      togglePlay();
      return;
    }
    setActiveIndex(i);
    setCurrentTime(0);
    setDuration(0);
    // cue (not load) so switching tracks never autoplays
    playerRef.current?.cueVideoById(tracks[i].youtubeId);
  };

  const activeTrack = tracks[activeIndex];
  const progress = duration > 0 ? Math.min(currentTime / duration, 1) * 100 : 0;

  return (
    <div style={{ padding: "24px 0" }}>
      {/* section header */}
      <div className="flex items-center" style={{ gap: "12px" }}>
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.12em",
            color: "var(--text-ghost)",
          }}
        >
          music
        </span>
        <span
          className="flex-1"
          style={{ height: "0.5px", background: "var(--border)" }}
        />
      </div>

      {/* sub-label */}
      <div
        style={{
          marginTop: "10px",
          fontSize: "11px",
          color: "var(--text-body)",
        }}
      >
        Current Top 5 Songs
      </div>

      {/* card */}
      <div
        style={{
          marginTop: "12px",
          background: "var(--bg-surface)",
          border: "0.5px solid var(--border)",
          borderRadius: "10px",
          padding: "20px 22px",
        }}
      >
        {/* now playing — clicking anywhere here toggles play/pause */}
        <div
          onClick={togglePlay}
          className="flex items-center"
          style={{ gap: "14px", cursor: "pointer", userSelect: "none" }}
        >
          {/* play / pause indicator */}
          <div
            className="flex items-center justify-center"
            style={{
              width: "48px",
              height: "48px",
              flexShrink: 0,
              borderRadius: "50%",
              background: "var(--bg-card)",
              border: isPlaying
                ? "1.5px solid color-mix(in srgb, var(--text-accent) 40%, transparent)"
                : "1.5px solid var(--border)",
            }}
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                <rect
                  x="3"
                  y="2"
                  width="3.5"
                  height="12"
                  rx="1"
                  fill="var(--text-accent)"
                />
                <rect
                  x="9.5"
                  y="2"
                  width="3.5"
                  height="12"
                  rx="1"
                  fill="var(--text-accent)"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                aria-hidden
                style={{ marginLeft: "2px" }}
              >
                <path d="M4 2.5 L13 8 L4 13.5 Z" fill="var(--text-accent)" />
              </svg>
            )}
          </div>

          {/* track info */}
          <div className="flex-1" style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--text-h2)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {activeTrack?.name}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--text-ghost)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {activeTrack?.artist} · {activeTrack?.album}
            </div>
          </div>

          {/* waveform */}
          <div
            className="flex items-end"
            style={{ gap: "2px", height: "20px", flexShrink: 0 }}
          >
            {WAVE_BARS.map((i) => (
              <span
                key={i}
                style={{
                  width: "2px",
                  height: "20px",
                  background: isPlaying ? "var(--wave)" : "var(--border-em)",
                  borderRadius: "1px",
                  transformOrigin: "bottom",
                  transform: isPlaying ? undefined : "scaleY(0.35)",
                  animation: isPlaying
                    ? `wave ${0.8 + (i % 3) * 0.25}s ease-in-out ${
                        i * 0.12
                      }s infinite`
                    : "none",
                  animationPlayState: isPlaying ? "running" : "paused",
                }}
              />
            ))}
          </div>
        </div>

        {/* progress bar */}
        <div
          style={{
            marginTop: "16px",
            width: "100%",
            height: "3px",
            background: "var(--border-sub)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "var(--progress-fill)",
              borderRadius: "2px",
              transition: "width 0.25s linear",
            }}
          />
        </div>
        <div
          className="flex items-center justify-between"
          style={{ marginTop: "5px" }}
        >
          <span
            style={{
              fontSize: "10px",
              fontFamily: "monospace",
              color: "var(--text-ghost)",
            }}
          >
            {formatTime(currentTime)}
          </span>
          <span
            style={{
              fontSize: "10px",
              fontFamily: "monospace",
              color: "var(--text-ghost)",
            }}
          >
            {formatTime(duration)}
          </span>
        </div>

        {/* track selector */}
        <div className="flex" style={{ gap: "6px", marginTop: "16px" }}>
          {tracks.map((track, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={track.id}
                onClick={() => selectTrack(i)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-em)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = active
                    ? "var(--border-em)"
                    : "var(--border-sub)";
                }}
                className="flex flex-col"
                style={{
                  flex: 1,
                  minWidth: 0,
                  alignItems: "flex-start",
                  gap: "6px",
                  padding: "8px 9px",
                  borderRadius: "7px",
                  background: active ? "var(--bg-card)" : "transparent",
                  border: active
                    ? "0.5px solid var(--border-em)"
                    : "0.5px solid var(--border-sub)",
                  outline: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
              >
                <span
                  style={{
                    width: "100%",
                    height: "2px",
                    borderRadius: "1px",
                    background: active
                      ? "var(--progress-fill)"
                      : "var(--border)",
                  }}
                />
                <span
                  style={{
                    fontSize: "9.5px",
                    color: active ? "var(--text-h2)" : "var(--text-dim)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {shortName(track.name)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* hidden YouTube player */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <div id="yt-player" />
      </div>
    </div>
  );
}
