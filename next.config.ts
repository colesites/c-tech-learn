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
    				destination: `${process.env.NEXT_PUBLIC_C15T_URL}/:path*`,
    			},
    		];
    	}
};

export default nextConfig;
