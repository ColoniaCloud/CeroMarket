import { collection, config, fields, singleton } from "@keystatic/core";
import { CATEGORIAS } from "./src/lib/categorias";

const fotoDeProducto = (label: string) =>
  fields.image({
    label,
    directory: "src/assets/productos",
    publicPath: "../../assets/productos/",
  });

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "CERO Market" },
    navigation: {
      Catálogo: ["productos"],
      Contenido: ["posts"],
      Local: ["ajustes"],
    },
  },
  collections: {
    productos: collection({
      label: "Productos",
      slugField: "nombre",
      path: "src/content/productos/*",
      format: { data: "yaml" },
      columns: ["nombre", "categoria", "marca"],
      schema: {
        nombre: fields.slug({
          name: { label: "Nombre" },
          slug: {
            label: "Dirección (URL)",
            description: "No la cambies en un producto ya publicado: rompe los enlaces que haya circulando.",
          },
        }),
        marca: fields.text({ label: "Marca", description: "Opcional. Se muestra arriba del nombre." }),
        presentacion: fields.text({ label: "Presentación", description: "Opcional. Ej: 250 ml, 190 g, a granel." }),
        categoria: fields.select({
          label: "Categoría",
          options: CATEGORIAS.map((categoria) => ({ label: categoria.nombre, value: categoria.slug })),
          defaultValue: "almacen",
        }),
        descripcion: fields.text({ label: "Descripción", multiline: true }),
        imagen: fotoDeProducto("Foto principal"),
        galeria: fields.array(fotoDeProducto("Foto"), { label: "Más fotos" }),
        precio: fields.number({
          label: "Precio (UYU)",
          description: "Opcional. Si queda vacío, el sitio invita a consultar el precio por WhatsApp.",
          validation: { min: 0 },
        }),
        destacado: fields.checkbox({ label: "Destacado en la portada", defaultValue: false }),
        disponible: fields.checkbox({ label: "Disponible", defaultValue: true }),
      },
    }),
    posts: collection({
      label: "Notas y recetas",
      slugField: "titulo",
      path: "src/content/posts/*",
      format: { contentField: "contenido" },
      entryLayout: "content",
      columns: ["titulo", "tipo", "borrador"],
      schema: {
        titulo: fields.slug({ name: { label: "Título" } }),
        tipo: fields.select({
          label: "Tipo",
          options: [
            { label: "Nota", value: "nota" },
            { label: "Receta", value: "receta" },
          ],
          defaultValue: "nota",
        }),
        bajada: fields.text({ label: "Bajada", multiline: true }),
        fecha: fields.date({ label: "Fecha de publicación" }),
        portada: fields.image({
          label: "Portada",
          directory: "src/assets/posts",
          publicPath: "../../assets/posts/",
        }),
        borrador: fields.checkbox({
          label: "Borrador",
          description: "Los borradores se ven en desarrollo pero no se publican.",
          defaultValue: true,
        }),
        contenido: fields.markdoc({
          label: "Contenido",
          options: { image: { directory: "src/assets/posts", publicPath: "../../assets/posts/" } },
        }),
      },
    }),
  },
  singletons: {
    ajustes: singleton({
      label: "Datos del local",
      path: "src/data/ajustes",
      format: { data: "json" },
      schema: {
        whatsapp: fields.text({ label: "WhatsApp", description: "Formato internacional, solo dígitos. Ej: 59896238315" }),
        email: fields.text({ label: "Email" }),
        instagram: fields.url({ label: "Instagram" }),
        facebook: fields.url({ label: "Facebook" }),
        direccion: fields.text({ label: "Dirección" }),
        mapa: fields.url({ label: "Enlace a Google Maps" }),
        horario: fields.text({ label: "Horario" }),
        envios: fields.text({ label: "Texto de envíos", multiline: true }),
      },
    }),
  },
});
