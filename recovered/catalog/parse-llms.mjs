// Parsea recovered/catalog/llms.txt (inventario que dejo el plugin Hostinger Tools
// en el WordPress viejo) a JSON estructurado. Es la unica fuente que sobrevivio al
// borrado de la base de datos.
import { readFileSync, writeFileSync } from "node:fs";

const raw = readFileSync("recovered/catalog/llms.txt", "utf8").replace(/^﻿/, "");

const decode = (s) =>
  s
    .replace(/&hellip;/g, "…")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "’")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

const sections = {};
let current = null;
for (const line of raw.split("\n")) {
  const heading = line.match(/^##\s+(.+?)\s*$/);
  if (heading) { current = heading[1]; sections[current] = []; continue; }
  const item = line.match(/^-\s+\[(.+?)\]\((https?:\/\/[^)]+)\)(?::\s*(.*))?$/);
  if (item && current) sections[current].push(item);
}

const toEntry = ([, name, url, desc]) => {
  const slug = decodeURIComponent(new URL(url).pathname).replace(/\/$/, "").split("/").pop();
  const body = desc ? decode(desc) : "";
  return {
    name: decode(name),
    slug,
    originalUrl: url,
    description: body.replace(/\s*\[…\]\s*$/, ""),
    descriptionTruncated: /\[…\]\s*$/.test(body),
  };
};

const products = (sections.Products ?? []).map(toEntry);
const posts = (sections.Posts ?? []).map(toEntry);
const pages = (sections.Pages ?? []).map(toEntry);

writeFileSync("recovered/catalog/products.json", JSON.stringify(products, null, 2) + "\n");
writeFileSync("recovered/catalog/posts.json", JSON.stringify(posts, null, 2) + "\n");
writeFileSync("recovered/catalog/pages.json", JSON.stringify(pages, null, 2) + "\n");

const withDesc = products.filter((p) => p.description).length;
console.log(`productos: ${products.length} (con descripcion: ${withDesc}, truncadas: ${products.filter((p) => p.descriptionTruncated).length})`);
console.log(`posts:     ${posts.length} (con bajada: ${posts.filter((p) => p.description).length})`);
console.log(`pages:     ${pages.length} -> ${pages.map((p) => p.slug).join(", ")}`);
