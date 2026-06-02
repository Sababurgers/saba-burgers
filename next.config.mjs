import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      // Añadir el dominio de Sanity cuando se configure el CMS
      // { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async redirects() {
    return [
      { source: "/locales", destination: "/ubicacion", permanent: true },
      { source: "/historia", destination: "/nuestro-producto", permanent: true },
    ];
  },
};

export default nextConfig;
