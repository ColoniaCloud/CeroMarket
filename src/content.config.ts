import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { aFoto, pedirAlPanel, type Foto, type ListaDelPanel, type MedioDelPanel } from "./lib/payload";

// El contenido se edita en el panel (admin/, admin.ceromarket.com.uy) y se
// lee de su API en cada build. Estos esquemas validan lo que llega: si algo
// no cumple, el build falla y queda publicada la versión anterior del sitio.

const foto = z.object({
  src: z.url(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string(),
});

const fotos = (medios: (MedioDelPanel | number)[] | null | undefined): Foto[] =>
  (medios ?? []).map(aFoto).filter((medio): medio is Foto => medio !== null);

type CategoriaDelPanel = { slug: string; nombre: string; orden?: number | null };

const categorias = defineCollection({
  loader: async () => {
    const { docs } = await pedirAlPanel<ListaDelPanel<CategoriaDelPanel>>("/api/categorias?limit=0&depth=0");
    return docs.map(({ slug, nombre, orden }) => ({ id: slug, nombre, orden: orden ?? 0 }));
  },
  schema: z.object({ nombre: z.string().min(1), orden: z.number() }),
});

type ProductoDelPanel = {
  slug: string;
  nombre: string;
  marca?: string | null;
  presentacion?: string | null;
  categoria: CategoriaDelPanel;
  descripcion?: string | null;
  imagen?: MedioDelPanel | number | null;
  galeria?: (MedioDelPanel | number)[] | null;
  precio?: number | null;
  destacado?: boolean | null;
  disponible?: boolean | null;
  venta?: "empaquetado" | "granel" | null;
  unidadGranel?: "kilo" | "litro" | null;
};

const productos = defineCollection({
  loader: async () => {
    const { docs } = await pedirAlPanel<ListaDelPanel<ProductoDelPanel>>("/api/productos?limit=0&depth=1");
    return docs.map((producto) => ({
      id: producto.slug,
      nombre: producto.nombre,
      marca: producto.marca ?? "",
      presentacion: producto.presentacion ?? "",
      categoria: producto.categoria.slug,
      categoriaNombre: producto.categoria.nombre,
      descripcion: producto.descripcion ?? "",
      imagen: aFoto(producto.imagen),
      galeria: fotos(producto.galeria),
      precio: producto.precio ?? null,
      destacado: producto.destacado === true,
      disponible: producto.disponible !== false,
      venta: producto.venta ?? "empaquetado",
      unidad: producto.unidadGranel ?? "kilo",
    }));
  },
  schema: z.object({
    nombre: z.string().min(1),
    marca: z.string(),
    presentacion: z.string(),
    categoria: z.string().min(1),
    categoriaNombre: z.string().min(1),
    descripcion: z.string(),
    imagen: foto.nullable(),
    galeria: z.array(foto),
    precio: z.number().nonnegative().nullable(),
    destacado: z.boolean(),
    disponible: z.boolean(),
    venta: z.enum(["empaquetado", "granel"]),
    unidad: z.enum(["kilo", "litro"]),
  }),
});

type PostDelPanel = {
  slug: string;
  titulo: string;
  tipo?: "nota" | "receta" | null;
  bajada?: string | null;
  fecha?: string | null;
  portada?: MedioDelPanel | number | null;
  contenidoHTML?: string | null;
};

// Sin sesión, la API del panel devuelve solo lo publicado: los borradores
// nunca llegan al sitio.
const posts = defineCollection({
  loader: async () => {
    const { docs } = await pedirAlPanel<ListaDelPanel<PostDelPanel>>("/api/posts?limit=0&depth=1");
    return docs.map((post) => ({
      id: post.slug,
      titulo: post.titulo,
      tipo: post.tipo ?? "nota",
      bajada: post.bajada ?? "",
      fecha: post.fecha ?? null,
      portada: aFoto(post.portada),
      contenidoHTML: post.contenidoHTML ?? "",
    }));
  },
  schema: z.object({
    titulo: z.string().min(1),
    tipo: z.enum(["nota", "receta"]),
    bajada: z.string(),
    fecha: z.coerce.date().nullable(),
    portada: foto.nullable(),
    contenidoHTML: z.string(),
  }),
});

export const collections = { categorias, productos, posts };
