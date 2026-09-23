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
    >
      <body>
        <div>{children}</div>
        {process.env.NODE_ENV !== "production" && <ThemeSwitcher />}
      </body>
    </html>
  );
}
