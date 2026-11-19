// Fuente única de las categorías: la usan el esquema de Astro y el panel de
// Keystatic. Las categorías originales de WooCommerce se perdieron con la
// base de datos; estas se infirieron de los nombres de los productos.
export const CATEGORIAS = [
  { slug: "especias", nombre: "Especias y condimentos" },
  { slug: "granos", nombre: "Granos, harinas y legumbres" },
  { slug: "frutos-secos", nombre: "Frutos secos y deshidratados" },
  { slug: "superalimentos", nombre: "Superalimentos" },
  { slug: "cafe-infusiones", nombre: "Café, yerba e infusiones" },
  { slug: "almacen", nombre: "Almacén" },
  { slug: "dulces", nombre: "Chocolates y snacks" },
  { slug: "cuidado-personal", nombre: "Cuidado personal" },
  { slug: "hogar", nombre: "Hogar zero waste" },
] as const;

export type CategoriaSlug = (typeof CATEGORIAS)[number]["slug"];

export const SLUGS_CATEGORIA = CATEGORIAS.map((categoria) => categoria.slug) as [
  CategoriaSlug,
  ...CategoriaSlug[],
];

export const nombreDeCategoria = (slug: CategoriaSlug): string =>
  CATEGORIAS.find((categoria) => categoria.slug === slug)?.nombre ?? slug;
