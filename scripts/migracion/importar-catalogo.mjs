// HISTÓRICO: ya corrió. Su salida quedó en admin/semilla/ y de ahí la cargó
// el panel (admin/lib/semilla.ts). Hoy el contenido se edita en el panel.
//
// Migración única: convierte el catálogo recuperado del WordPress caído
// (recovered/catalog/*.json, ver docs/RECUPERACION-CATALOGO.md) en archivos de
// contenido de Keystatic. Una vez que se edita contenido desde el panel, NO
// volver a correrlo: pisa src/content y src/assets. Por eso exige --forzar
// si ya hay contenido.
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { stringify } from "yaml";

const RAIZ = new URL("../../", import.meta.url);
const ruta = (relativa) => fileURLToPath(new URL(relativa, RAIZ));
const leerJson = (relativa) => JSON.parse(readFileSync(ruta(relativa), "utf8"));

const DESTINOS = ["src/content/productos", "src/content/posts", "src/assets/productos", "src/assets/posts", "src/assets/sitio"];
const forzar = process.argv.includes("--forzar");
const hayContenido = DESTINOS.some((d) => existsSync(ruta(d)) && readdirSync(ruta(d)).length > 0);
if (hayContenido && !forzar) {
  console.error("Ya hay contenido en src/content o src/assets. Usá --forzar para pisarlo.");
  process.exit(1);
}
for (const destino of DESTINOS) {
  rmSync(ruta(destino), { recursive: true, force: true });
  mkdirSync(ruta(destino), { recursive: true });
}

const productos = leerJson("recovered/catalog/products.json");
const posts = leerJson("recovered/catalog/posts.json");
const imagenes = existsSync(ruta("scripts/migracion/imagenes.json"))
  ? leerJson("scripts/migracion/imagenes.json")
  : { productos: {}, posts: {}, destacados: [] };

// --- Nombres ---------------------------------------------------------------
// WordPress tenía nombres en MAYÚSCULAS mezclados con minúsculas. Se pasa
// todo a tipo oración y se corrige a mano lo que lleva nombre propio, marca
// o presentación. Los slugs NO se tocan: son las URLs.
const aOracion = (texto) => {
  const minusculas = texto.toLocaleLowerCase("es");
  return minusculas.charAt(0).toLocaleUpperCase("es") + minusculas.slice(1);
};

const CORRECCIONES = {
  "chocolate-amargo-71-cacao": { nombre: "Chocolate amargo 71% cacao" },
  "cafe-organico-campo-claro-90-gr": { nombre: "Café orgánico", marca: "Campo Claro", presentacion: "90 g" },
  "herbs-de-provence": { nombre: "Herbes de Provence" },
  "castanas-de-para-organicas-190-gr": { nombre: "Castañas de Pará orgánicas", marca: "Prana", presentacion: "190 g" },
  "harina-de-trigo-organica-000": { nombre: "Harina de trigo orgánica 000", marca: "Campo Claro", presentacion: "1 kg" },
  "vitanna-orujo-de-uva-tannat-100-g": { nombre: "Orujo de uva Tannat", marca: "Vitanna", presentacion: "100 g" },
  "vitanna-orujo-de-uva-tannat-350-g": { nombre: "Orujo de uva Tannat", marca: "Vitanna", presentacion: "350 g" },
  "nueces-pecan": { nombre: "Nueces pecán" },
  "bombonera-x6-frutos-nativos": { nombre: "Bombonera de frutos nativos", marca: "Autóctonario", presentacion: "6 bombones" },
  "bombonera-x3-frutos-nativos": { nombre: "Bombonera de frutos nativos", marca: "Autóctonario", presentacion: "3 bombones" },
  "yerba-santa-nativa-bolsa-tela-1kg": { nombre: "Yerba mate nativa en bolsa de tela", marca: "Santa", presentacion: "1 kg" },
  "repelente-tierra-pura": { nombre: "Repelente natural", marca: "Tierra Pura", presentacion: "120 ml" },
  "aceite-de-mostaza-250-ml": { nombre: "Aceite de mostaza", presentacion: "250 ml" },
  "aceite-de-lino-250-ml": { nombre: "Aceite de lino", marca: "Trinidad", presentacion: "250 ml" },
  "cardamomo-semillas": { nombre: "Cardamomo en semillas" },
  "sham-solido-palta-hibisco-magnolia-naturalmente": { nombre: "Shampoo sólido de palta, hibisco y magnolia", marca: "Naturalmente" },
  "salsa-macha-170-gr-apicio": { nombre: "Salsa macha", marca: "Apicio", presentacion: "170 g" },
  "semolin": { nombre: "Semolín" },
  "pepinos-agridulces-pikels-350ml-230gr-esc-apicio": { nombre: "Pepinos agridulces", marca: "Apicio", presentacion: "350 ml · 230 g escurrido" },
  "enjuague-bucal-agna-200ml": { nombre: "Enjuague bucal", marca: "Agna", presentacion: "200 ml" },
  "mostacha-dijon-160-gr-apicio": { nombre: "Mostacha Dijon", marca: "Apicio", presentacion: "160 g" },
  "mostacha-americana-xl-320-gr-apicio": { nombre: "Mostacha americana XL", marca: "Apicio", presentacion: "320 g" },
  "mostacha-americana-160-gr-apicio": { nombre: "Mostacha americana", marca: "Apicio", presentacion: "160 g" },
  "limpiador-facial-linduras": { nombre: "Limpiador facial", marca: "Linduras" },
  "agua-micelar-ammalua-100-ml": { nombre: "Agua micelar", marca: "Ammalua", presentacion: "100 ml" },
  "mascarilla-facial-ammalua-50-ml": { nombre: "Mascarilla facial", marca: "Ammalua", presentacion: "50 ml" },
  "serum-facial-30-ml-sabia": { nombre: "Sérum facial", marca: "Sabia", presentacion: "30 ml" },
  "gingko-biloba": { nombre: "Ginkgo biloba" },
  "envoltorio-ecologico-mediano": { nombre: "Envoltorio ecológico mediano" },
  "envoltorio-ecologico-chico": { nombre: "Envoltorio ecológico chico" },
  "condimento-tipo-azafran": { nombre: "Condimento tipo azafrán" },
  "chocolate-semi-amargo-belcolade-55-cacao": { nombre: "Chocolate semiamargo 55% cacao", marca: "Belcolade" },
  "chocolate-amargo-96-cacao": { nombre: "Chocolate amargo 96% cacao" },
  "mermelada-de-zapallo-granel": { nombre: "Mermelada de zapallo", presentacion: "A granel" },
  "crema-de-nuez-pecan-235g": { nombre: "Crema de nuez pecán", marca: "Samadhi", presentacion: "235 g" },
  "crema-de-caju-235g-samadhi": { nombre: "Crema de cajú", marca: "Samadhi", presentacion: "235 g" },
  "crema-de-almendras-235g-samadhi": { nombre: "Crema de almendras", marca: "Samadhi", presentacion: "235 g" },
  "crema-de-hibisco-y-rosas-ambar": { nombre: "Crema de hibisco y rosas", marca: "Ambar" },
  "crema-de-malva-ambar": { nombre: "Crema de malva", marca: "Ambar" },
  "serum-facial-ambar": { nombre: "Sérum facial", marca: "Ambar" },
  "roll-on-contorno-de-ojos-ambar": { nombre: "Roll-on contorno de ojos", marca: "Ambar" },
  "gel-de-limpieza-facial-ambar": { nombre: "Gel de limpieza facial", marca: "Ambar" },
  "agua-de-limpieza-facial-ambar": { nombre: "Agua de limpieza facial", marca: "Ambar" },
  "kombucha-bendita-1lt": { nombre: "Kombucha", marca: "Bendita", presentacion: "1 l" },
  "cafe-descafeinado-grano": { nombre: "Café descafeinado en grano" },
  "cafe-moggiana-grano": { nombre: "Café Moggiana en grano" },
  "cafe-organico-grano": { nombre: "Café orgánico en grano" },
  "estuche-de-bambu-para-cepillo-de-dientes-my-eco": { nombre: "Estuche de bambú para cepillo de dientes", marca: "My Eco" },
  "base-para-cepillo-de-dientes-my-eco": { nombre: "Base para cepillo de dientes", marca: "My Eco" },
  "cilantro-deshidratado-hojas": { nombre: "Cilantro deshidratado en hojas" },
  "saquitos-de-te": { nombre: "Saquitos de té" },
  "bolsa-tela-marinera-30cm-x-30cm": { nombre: "Bolsa de tela marinera", presentacion: "30 × 30 cm" },
};

// --- Categorías (inferidas: las originales se perdieron con la base) ---------
const CATEGORIA_POR_SLUG = {
  especias: ["comino-molido", "pimienta-de-cayena", "anis-estrellado-molido", "herbs-de-provence", "clavo-de-olor-molido", "fenogreco", "garam-masala-aromatico", "pimienta-rosa-en-grano", "anis-estrellado-entero", "cardamomo-molido", "cardamomo-semillas", "condimento-tipo-azafran", "comino-entero", "ciboulette-deshidratado", "condimento-para-guiso", "cilantro-deshidratado-hojas", "albahaca-triturada-deshidratada", "adobo"],
  granos: ["arroz-basmati", "harina-de-trigo-organica-000", "poroto-tape", "urad-dal", "harina-de-espelta", "receta-mix-de-lentejas", "receta-mix-cous-cous", "semolin", "poroto-mung", "farina-de-mandioca", "arroz-grano-medio"],
  "frutos-secos": ["castanas-de-para-organicas-190-gr", "nueces-pecan", "pinones", "almendras-naturales", "pasas-de-uva-pequenas", "avellanas-peladas", "peras-deshidratadas", "nueces-en-cuartillo", "mix-frutos-secos-sin-sal", "manzana-deshidratada-en-cubos"],
  superalimentos: ["vitanna-orujo-de-uva-tannat-100-g", "vitanna-orujo-de-uva-tannat-350-g", "espirulina-en-polvo", "psyllium-husk", "lecitina-de-soja-granulada"],
  "cafe-infusiones": ["cafe-organico-campo-claro-90-gr", "yerba-santa-nativa-bolsa-tela-1kg", "yerba-suave", "tilo", "manzanilla", "boldo", "gingko-biloba", "cafe-descafeinado-grano", "cafe-moggiana-grano", "cafe-organico-grano"],
  almacen: ["aceite-de-mostaza-250-ml", "aceite-de-lino-250-ml", "salsa-macha-170-gr-apicio", "pepinos-agridulces-pikels-350ml-230gr-esc-apicio", "mostacha-dijon-160-gr-apicio", "mostacha-americana-xl-320-gr-apicio", "mostacha-americana-160-gr-apicio", "hongos-shitake-secos-y-trozados", "gelatina-sin-sabor", "mermelada-de-zapallo-granel", "crema-de-nuez-pecan-235g", "crema-de-caju-235g-samadhi", "crema-de-almendras-235g-samadhi", "kombucha-bendita-1lt"],
  dulces: ["chocolate-amargo-71-cacao", "bombonera-x6-frutos-nativos", "bombonera-x3-frutos-nativos", "galletas-de-avena", "bolitas-de-arroz", "gelatinas-mix", "granola-chocolate", "chocolate-semi-amargo-belcolade-55-cacao", "chocolate-amargo-96-cacao", "bolitas-de-cereal-banadas"],
  "cuidado-personal": ["peine-de-madera", "repelente-tierra-pura", "cepillo-para-ducha", "balsamo-labial", "sham-solido-palta-hibisco-magnolia-naturalmente", "enjuague-bucal-agna-200ml", "limpiador-facial-linduras", "agua-micelar-ammalua-100-ml", "mascarilla-facial-ammalua-50-ml", "serum-facial-30-ml-sabia", "crema-de-hibisco-y-rosas-ambar", "crema-de-malva-ambar", "serum-facial-ambar", "roll-on-contorno-de-ojos-ambar", "gel-de-limpieza-facial-ambar", "agua-de-limpieza-facial-ambar", "estuche-de-bambu-para-cepillo-de-dientes-my-eco", "base-para-cepillo-de-dientes-my-eco"],
  // Saquitos de té: la foto muestra saquitos de tela reutilizables, no té.
  hogar: ["envoltorio-ecologico-mediano", "envoltorio-ecologico-chico", "bolsa-tela-marinera-30cm-x-30cm", "saquitos-de-te"],
};
const categoriaDe = new Map(
  Object.entries(CATEGORIA_POR_SLUG).flatMap(([categoria, slugs]) => slugs.map((slug) => [slug, categoria])),
);

// WordPress cortaba algunas descripciones a mitad de frase. Se recortan a la
// última oración completa para no publicar texto cortado.
const recortarAOracionCompleta = (texto) => {
  const fin = Math.max(texto.lastIndexOf(". "), texto.lastIndexOf("! "), texto.lastIndexOf("? "));
  return fin > 0 ? texto.slice(0, fin + 1) : texto;
};

const copiarImagen = (origen, carpetaDestino, nombreBase) => {
  const desde = ruta(`recovered/media/${origen}`);
  if (!existsSync(desde)) throw new Error(`No existe la imagen ${origen}`);
  const archivo = `${nombreBase}${extname(origen).toLowerCase()}`;
  mkdirSync(ruta(carpetaDestino), { recursive: true });
  copyFileSync(desde, join(ruta(carpetaDestino), archivo));
  return archivo;
};

const destacados = new Set(imagenes.destacados ?? []);
const informe = { sinCategoria: [], conImagen: 0, recortadas: [] };

for (const producto of productos) {
  const { slug } = producto;
  const correccion = CORRECCIONES[slug] ?? {};
  const categoria = categoriaDe.get(slug);
  if (!categoria) informe.sinCategoria.push(slug);

  let descripcion = producto.description;
  if (producto.descriptionTruncated) {
    descripcion = recortarAOracionCompleta(descripcion);
    informe.recortadas.push(slug);
  }
  descripcion = descripcion.charAt(0).toLocaleUpperCase("es") + descripcion.slice(1);

  const datos = {
    nombre: correccion.nombre ?? aOracion(producto.name),
    marca: correccion.marca ?? "",
    presentacion: correccion.presentacion ?? "",
    categoria: categoria ?? "almacen",
    descripcion,
  };

  const fotos = imagenes.productos?.[slug];
  if (fotos?.imagen) {
    const archivo = copiarImagen(fotos.imagen, `src/assets/productos/${slug}`, "imagen");
    datos.imagen = `../../assets/productos/${slug}/${archivo}`;
    informe.conImagen++;
  }
  datos.galeria = (fotos?.galeria ?? []).map((origen, indice) => {
    const archivo = copiarImagen(origen, `src/assets/productos/${slug}`, `galeria-${indice + 1}`);
    return `../../assets/productos/${slug}/${archivo}`;
  });
  datos.destacado = destacados.has(slug);
  datos.disponible = true;

  writeFileSync(ruta(`src/content/productos/${slug}.yaml`), stringify(datos, { lineWidth: 0 }));
}

for (const [destino, origen] of Object.entries(imagenes.sitio ?? {})) {
  copyFileSync(ruta(`recovered/media/${origen}`), join(ruta("src/assets/sitio"), destino));
}

// Un slug de WordPress traía un emoji (…-crema-de-coco-🥥): se limpia a
// caracteres seguros para nombres de archivo y URLs.
const limpiarSlug = (slug) =>
  slug
    .normalize("NFKD")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

for (const post of posts) {
  const slug = limpiarSlug(post.slug);
  const frontmatter = {
    titulo: post.name,
    tipo: slug === "cous-cous-con-verduras-y-queso" ? "receta" : "nota",
    bajada: post.description,
    // Sin cuerpo recuperado: quedan como borrador hasta que alguien los escriba.
    borrador: true,
  };
  const portada = imagenes.posts?.[slug];
  if (portada) {
    const archivo = copiarImagen(portada, `src/assets/posts/${slug}`, "portada");
    frontmatter.portada = `../../assets/posts/${slug}/${archivo}`;
  }
  writeFileSync(ruta(`src/content/posts/${slug}.mdoc`), `---\n${stringify(frontmatter, { lineWidth: 0 })}---\n`);
}

console.log(`productos: ${productos.length} (con foto: ${informe.conImagen}, destacados: ${destacados.size})`);
console.log(`posts:     ${posts.length} (todos en borrador, ${Object.keys(imagenes.posts ?? {}).length} con portada)`);
console.log(`descripciones recortadas a oración completa: ${informe.recortadas.length}`);
if (informe.sinCategoria.length) console.log(`SIN CATEGORÍA (quedaron en almacén): ${informe.sinCategoria.join(", ")}`);
