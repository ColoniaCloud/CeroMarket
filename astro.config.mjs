// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// El contenido viene del panel (admin/, admin.ceromarket.com.uy) en cada
// build; el sitio publicado es 100% estático. PAYLOAD_URL permite apuntar a
// un panel local para probar (ver src/lib/payload.ts).
const panel = new URL(process.env.PAYLOAD_URL ?? "https://admin.ceromarket.com.uy");

export default defineConfig({
  site: "https://ceromarket.com.uy",
  integrations: [sitemap({ filter: (pagina) => !pagina.endsWith("/pedido/") })],
  // Astro baja las fotos del panel al compilar y las optimiza como las locales.
  image: {
    remotePatterns: [{ protocol: panel.protocol.replace(":", ""), hostname: panel.hostname }],
  },
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  vite: { plugins: [tailwindcss()] },
});
