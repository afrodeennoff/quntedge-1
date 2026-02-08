import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const isStandaloneBuild = process.env.NEXT_OUTPUT_STANDALONE === "true";

const nextConfig: NextConfig = {
  ...(isStandaloneBuild ? { output: "standalone" as const } : {}),
  outputFileTracingRoot: process.cwd(),
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: 'fhvmtnvjiotzztimdxbi.supabase.co',
      },
      {
        hostname: 'raw.githubusercontent.com',
      },
    ],
    deviceSizes: [320, 480, 768, 1024, 1200, 1440, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  pageExtensions: ['mdx', 'ts', 'tsx'],
  experimental: {
    useCache: true,
    mdxRs: true,
    optimizePackageImports: [
      'lucide-react',
      'recharts',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      'framer-motion',
      'd3',
    ],
  },
  compress: true,
  ...(isStandaloneBuild
    ? {
      outputFileTracingIncludes: {
        '/*': [
          '**/node_modules/@prisma/engines/libquery_engine-rhel-openssl-3.0.x.so.node',
          '**/node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node',
        ],
        '/app/api/**': [
          '**/node_modules/.prisma/client/**',
        ],
      },
    }
    : {}),
  async headers() {
    return [
      {
        source: "/((?!embed).*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: "base-uri 'self'; object-src 'none'; frame-ancestors 'self'" },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module: any) {
                const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)
                if (match) {
                  const packageName = match[1]
                  if (packageName === '@radix-ui') return 'radix-ui'
                  if (packageName.startsWith('d3')) return 'd3'
                  return 'vendor'
                }
                return 'vendor'
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            common: {
              name: 'common',
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      }
    }
    return config
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
