import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { THEME } from "@/config/theme";
import ThemeSwitcher from "@/components/dev/ThemeSwitcher";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-serif",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jerome Rodrigo",
  description: "ML engineer · data science & math · Northeastern",
  icons: "/favicon.svg",
};

// Runs before first paint: opts <html> into the section-reveal hidden state
// only when motion is allowed and IntersectionObserver exists. Failsafe: if a
// page with .reveal sections never hydrates, drop the class so nothing stays
// hidden. See components/RevealSection.tsx + .reveal in globals.css.
const MOTION_SCRIPT = `(function(){try{var d=document.documentElement;if(!window.IntersectionObserver||matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("motion-ok");setTimeout(function(){if(!d.dataset.revealReady&&document.querySelector(".reveal"))d.classList.remove("motion-ok")},3000)}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme={THEME}
      className={`${fraunces.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_SCRIPT }} />
      </head>
      <body>
        <div>{children}</div>
        {process.env.NODE_ENV !== "production" && <ThemeSwitcher />}
      </body>
    </html>
  );
}
