import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {   
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dynamic.heygen.ai',        
        pathname: '/**', // you can use wildcards
      },
      
    ],
  }
};

export default nextConfig;
