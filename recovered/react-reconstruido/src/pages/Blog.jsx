import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../graphql/posts";
import PostCard from "../components/PostCard";

function Blog() {
  const { data, loading, error } = useQuery(GET_ALL_POSTS);
  const posts = data?.posts?.nodes || [];

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6">Blog</h1>
      {loading && <p>Cargando artículos...</p>}
      {error && <p>Error al cargar artículos.</p>}
      {!loading && !error && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Blog;
