// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import sitemap from "@astrojs/sitemap";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";

// Keystatic inyecta su panel como rutas de servidor. Solo lo cargamos en
// desarrollo: el sitio publicado queda 100% estático y el contenido se edita
// localmente en /keystatic, que escribe archivos en el repo.
const esDesarrollo = process.argv.includes("dev");

export default defineConfig({
  site: "https://ceromarket.com.uy",
  integrations: [react(), markdoc(), sitemap(), ...(esDesarrollo ? [keystatic()] : [])],
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  vite: { plugins: [tailwindcss()] },
});
