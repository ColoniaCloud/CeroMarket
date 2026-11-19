import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

// Los borradores se ven mientras se edita (astro dev) y nunca en el build.
export const obtenerPosts = async (tipo?: Post["data"]["tipo"]): Promise<Post[]> => {
  const posts = await getCollection(
    "posts",
    (post) => (import.meta.env.DEV || !post.data.borrador) && (!tipo || post.data.tipo === tipo),
  );
  return posts.sort((a, b) => (b.data.fecha?.getTime() ?? 0) - (a.data.fecha?.getTime() ?? 0));
};

const fecha = new Intl.DateTimeFormat("es-UY", { day: "numeric", month: "long", year: "numeric" });

export const fechaLegible = (post: Post): string => (post.data.fecha ? fecha.format(post.data.fecha) : "");
