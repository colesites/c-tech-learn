import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
	typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
    async rewrites() {
    		return [
    			{
    				source: '/api/c15t/:path*',
    				// Ensure destination is always a valid string starting with "/" or a full URL
    				// If NEXT_PUBLIC_C15T_URL is not defined, this will default to a relative path
    				destination: `${process.env.NEXT_PUBLIC_C15T_URL || ''}/:path*`,
    			},
    		];
    	}
};

export default nextConfig;
