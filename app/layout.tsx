import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
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
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
