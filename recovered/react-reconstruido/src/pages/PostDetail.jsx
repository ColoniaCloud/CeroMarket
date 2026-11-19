import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GET_POST_BY_SLUG } from "../graphql/posts";

function PostDetail() {
  const { slug } = useParams();
  const { data, loading, error } = useQuery(GET_POST_BY_SLUG, {
    variables: { slug },
  });
  const post = data?.post;
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="w-full">
      {loading && <p className="container mx-auto px-4 py-12">Cargando artículo...</p>}
      {error && <p className="container mx-auto px-4 py-12">Error al cargar el artículo.</p>}
      {!loading && !error && post && (
        <>
          <header className="w-full relative">
            <div
              className="w-full h-[25vh] bg-center bg-cover flex items-end relative overflow-hidden isolate"
              style={{
                backgroundImage: `url('${post.featuredImage?.node?.sourceUrl || ""}')`,
              }}
            >
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                style={{ backdropFilter: "blur(4px)" }}
              />
              <div className="relative z-10 container mx-auto px-4 pb-4">
                <h1 className="text-2xl md:text-4xl font-bold text-white">{post.title}</h1>
              </div>
            </div>
            <div className="container mx-auto px-4 mt-5">
              <div className="max-w-3xl mx-auto p-2 flex items-center justify-between">
                <div className="font-semibold">Compartelo con tus amigos</div>
                <div className="flex items-center gap-4 text-2xl text-gray-800">
                  <a href={`https://www.instagram.com/?url=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noreferrer" className="hover:text-primary">
                    <FaInstagram />
                  </a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noreferrer" className="hover:text-primary">
                    <FaFacebook />
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noreferrer" className="hover:text-primary">
                    <FaXTwitter />
                  </a>
                  <a href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + pageUrl)}`} target="_blank" rel="noreferrer" className="hover:text-primary">
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 mt-5" style={{ minHeight: "70vh" }}>
            <div className="max-w-3xl mx-auto flex flex-col justify-start h-auto pt-5 pb-[15%]">
              <div className="prose prose-lg max-w-none">
                <div className="text-sm text-gray-500 mb-4">
                  {new Date(post.date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default PostDetail;
