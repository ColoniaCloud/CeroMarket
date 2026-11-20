import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

// Solo llegan los posts publicados en el panel: los borradores se quedan ahí.
export const obtenerPosts = async (tipo?: Post["data"]["tipo"]): Promise<Post[]> => {
  const posts = await getCollection("posts", (post) => !tipo || post.data.tipo === tipo);
  return posts.sort((a, b) => (b.data.fecha?.getTime() ?? 0) - (a.data.fecha?.getTime() ?? 0));
};

const fecha = new Intl.DateTimeFormat("es-UY", { day: "numeric", month: "long", year: "numeric" });

export const fechaLegible = (post: Post): string => (post.data.fecha ? fecha.format(post.data.fecha) : "");
