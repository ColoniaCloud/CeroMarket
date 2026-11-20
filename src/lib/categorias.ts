import { getCollection, type CollectionEntry } from "astro:content";

// Las categorías se editan en el panel; el orden también.
export type Categoria = CollectionEntry<"categorias">;

export const obtenerCategorias = async (): Promise<Categoria[]> => {
  const categorias = await getCollection("categorias");
  return categorias.sort((a, b) => a.data.orden - b.data.orden || a.data.nombre.localeCompare(b.data.nombre, "es"));
};
