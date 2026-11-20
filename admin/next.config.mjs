import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // pdfjs-dist (lee la lista de precios) se carga desde node_modules en lugar
  // de empaquetarse; su archivo de trabajo se importa en lib/lista/leerPdf.ts
  // para que el build de producción lo incluya.
  serverExternalPackages: ["pdfjs-dist"],
  turbopack: {
    root: process.cwd(),
  },
  // Sin esto el panel arma su metadata contra http://localhost:3000.
  env: {
    PAYLOAD_PUBLIC_SERVER_URL: "https://admin.ceromarket.com.uy",
  },
  // El subdominio es solo el panel: la raíz manda al login.
  async redirects() {
    return [{ source: "/", destination: "/admin", permanent: false }];
  },
};

export default withPayload(nextConfig);
