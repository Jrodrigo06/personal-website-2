"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";

// A plain <section> that fades/rises in once as it enters the viewport.
// The motion itself lives in globals.css (.reveal); the hidden starting state
// only applies when <html> carries .motion-ok (set by the inline script in
// app/layout.tsx), so no-JS and reduced-motion visitors always see content.
export default function RevealSection({ className, ...props }: ComponentProps<"section">) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.revealReady = "1";
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      const show = () => setInView(true);
      show();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`reveal${inView ? " is-in" : ""}${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
