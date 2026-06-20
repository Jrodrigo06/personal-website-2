import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 locks optimized output to qualities listed here (defaults to [75]).
    // Allow a higher value so small portraits don't show WebP artifacts.
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
