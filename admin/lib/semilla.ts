// Carga inicial: pasa a Payload el contenido que antes vivía en el repo del
// sitio Astro y que ahora está en admin/semilla/ (YAML de productos, posts,
// fotos y datos del local). Se corre con `npm run semilla` sobre una base
// vacía; en producción ya corrió el 2026-11-20. Si ya hay productos, no hace nada.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { Payload, PayloadRequest } from "payload";
import { parse } from "yaml";
import { SIN_PUBLICAR } from "./publicar";

// Las categorías que tenía el sitio al migrar. De acá en adelante se editan
// en el panel.
const CATEGORIAS = [
  { slug: "especias", nombre: "Especias y condimentos" },
  { slug: "granos", nombre: "Granos, harinas y legumbres" },
  { slug: "frutos-secos", nombre: "Frutos secos y deshidratados" },
  { slug: "superalimentos", nombre: "Superalimentos" },
  { slug: "cafe-infusiones", nombre: "Café, yerba e infusiones" },
  { slug: "almacen", nombre: "Almacén" },
  { slug: "dulces", nombre: "Chocolates y snacks" },
  { slug: "cuidado-personal", nombre: "Cuidado personal" },
  { slug: "hogar", nombre: "Hogar zero waste" },
];

type ProductoYaml = {
  nombre: string;
  marca?: string;
  presentacion?: string;
  categoria: string;
  descripcion?: string;
  imagen?: string | null;
  galeria?: string[];
  precio?: number | null;
  destacado?: boolean;
  disponible?: boolean;
};

type PostYaml = {
  titulo: string;
  tipo?: "nota" | "receta";
  bajada?: string;
  fecha?: string;
  portada?: string | null;
  borrador?: boolean;
};

const leerFrontmatter = (texto: string): { datos: unknown; cuerpo: string } => {
  const coincidencia = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(texto);
  if (!coincidencia) throw new Error("Post sin frontmatter");
  return { datos: parse(coincidencia[1] ?? ""), cuerpo: (coincidencia[2] ?? "").trim() };
};

export const cargarContenidoInicial = async (payload: Payload, req?: PayloadRequest) => {
  const { totalDocs } = await payload.count({ collection: "productos", req });
  if (totalDocs > 0) {
    payload.logger.info(`[semilla] Ya hay ${totalDocs} productos: no se carga nada.`);
    return;
  }

  const raiz = path.join(process.cwd(), "semilla");
  const carpetaProductos = path.join(raiz, "content/productos");
  // Mejor que el build falle a que la migración quede registrada como hecha
  // con el panel vacío: después no vuelve a correr sola.
  if (!existsSync(carpetaProductos)) {
    throw new Error(`[semilla] No está ${carpetaProductos}: hace falta admin/semilla para la carga inicial.`);
  }

  const contexto = { [SIN_PUBLICAR]: true };
  const subirFoto = async (relativa: string | null | undefined, desde: string, alt: string) => {
    if (!relativa) return undefined;
    const archivo = path.resolve(desde, relativa);
    if (!existsSync(archivo)) {
      payload.logger.warn(`[semilla] Falta la foto ${archivo}`);
      return undefined;
    }
    const medio = await payload.create({ collection: "medios", data: { alt }, filePath: archivo, req, context: contexto });
    return medio.id;
  };

  const categoriaPorSlug = new Map<string, number>();
  for (const [orden, categoria] of CATEGORIAS.entries()) {
    const creada = await payload.create({
      collection: "categorias",
      data: { ...categoria, orden: orden + 1 },
      req,
      context: contexto,
    });
    categoriaPorSlug.set(categoria.slug, creada.id);
  }

  const archivosProductos = readdirSync(carpetaProductos).filter((nombre) => nombre.endsWith(".yaml"));
  for (const archivo of archivosProductos) {
    const datos = parse(readFileSync(path.join(carpetaProductos, archivo), "utf8")) as ProductoYaml;
    const categoria = categoriaPorSlug.get(datos.categoria);
    if (!categoria) throw new Error(`[semilla] ${archivo}: categoría desconocida «${datos.categoria}»`);
    const imagen = await subirFoto(datos.imagen, carpetaProductos, datos.nombre);
    const galeria = [];
    for (const [indice, foto] of (datos.galeria ?? []).entries()) {
      const id = await subirFoto(foto, carpetaProductos, `${datos.nombre}, foto ${indice + 2}`);
      if (id) galeria.push(id);
    }
    await payload.create({
      collection: "productos",
      data: {
        nombre: datos.nombre,
        slug: archivo.replace(/\.yaml$/, ""),
        marca: datos.marca || undefined,
        presentacion: datos.presentacion || undefined,
        categoria,
        precio: datos.precio ?? undefined,
        descripcion: datos.descripcion || undefined,
        imagen,
        galeria,
        venta: "empaquetado",
        destacado: datos.destacado ?? false,
        disponible: datos.disponible ?? true,
      },
      req,
      context: contexto,
    });
  }

  const carpetaPosts = path.join(raiz, "content/posts");
  const archivosPosts = existsSync(carpetaPosts)
    ? readdirSync(carpetaPosts).filter((nombre) => nombre.endsWith(".mdoc"))
    : [];
  for (const archivo of archivosPosts) {
    const { datos, cuerpo } = leerFrontmatter(readFileSync(path.join(carpetaPosts, archivo), "utf8"));
    const post = datos as PostYaml;
    if (cuerpo) payload.logger.warn(`[semilla] ${archivo} tiene cuerpo: se carga solo la bajada.`);
    const portada = await subirFoto(post.portada, carpetaPosts, post.titulo);
    await payload.create({
      collection: "posts",
      data: {
        titulo: post.titulo,
        slug: archivo.replace(/\.mdoc$/, ""),
        tipo: post.tipo ?? "nota",
        bajada: post.bajada || undefined,
        fecha: post.fecha || undefined,
        portada,
        _status: post.borrador === false ? "published" : "draft",
      },
      draft: post.borrador !== false,
      req,
      context: contexto,
    });
  }

  const ajustes = path.join(raiz, "ajustes.json");
  if (existsSync(ajustes)) {
    await payload.updateGlobal({
      slug: "ajustes",
      data: JSON.parse(readFileSync(ajustes, "utf8")),
      req,
      context: contexto,
    });
  }

  payload.logger.info(
    `[semilla] Cargados ${CATEGORIAS.length} categorías, ${archivosProductos.length} productos y ${archivosPosts.length} posts.`,
  );
};
