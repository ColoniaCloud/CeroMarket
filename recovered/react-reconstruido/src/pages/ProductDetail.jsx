import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaEnvelope,
  FaTruck,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GET_PRODUCT_BY_SLUG } from "../graphql/products";
import ProductsCarousel from "../components/ProductsCarousel";

const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "59896238315";

function ProductDetail() {
  const { slug } = useParams();
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_SLUG, {
    variables: { slug },
  });
  const product = data?.product;

  const images = [];
  if (product?.image) images.push(product.image);
  if (product?.galleryImages?.nodes?.length) {
    images.push(...product.galleryImages.nodes);
  }

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = product?.name
    ? `Mirá este producto: ${product.name}`
    : "Mirá este producto";

  return (
    <div>
      <section className="container mx-auto px-4 py-6">
        {loading && <p>Cargando producto...</p>}
        {error && <p>Error al cargar el producto.</p>}
        {!loading && !error && product && (
          <>
            <nav className="text-sm text-gray-500 mb-4">
              <Link to="/" className="hover:underline">Inicio</Link>
              <span className="mx-2">/</span>
              <Link to="/productos" className="hover:underline">Productos</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700">{product.name}</span>
            </nav>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div>
                {images[0] ? (
                  <img
                    src={images[0].sourceUrl}
                    alt={images[0].altText || product.name}
                    className="w-full h-80 md:h-[28rem] object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-80 md:h-[28rem] bg-gray-100 rounded" />
                )}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold mb-3">{product.name}</h1>
                {product.description && (
                  <div
                    className="mb-6"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                )}
                <div className="flex flex-col gap-3 mb-4">
                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          `Hola, quiero comprar ${product.name}`,
                        )}`,
                        "_blank",
                      )
                    }
                    aria-label={`Comprar por Whatsapp: ${product.name}`}
                    className="inline-flex items-center gap-3 text-lg md:text-xl bg-[#25D366] hover:bg-[#1ebe57] text-white px-6 py-3 rounded-md"
                  >
                    <FaWhatsapp className="text-2xl md:text-3xl" />
                    <span>Comprar por Whatsapp</span>
                  </button>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FaTruck className="text-lg" />
                    <span>Envíos en el día a todo montevideo y 24Hs al interior del país</span>
                  </div>
                </div>
                <div className="mt-6 bg-gray-100 p-4 rounded">
                  <div className="font-semibold mb-2">Compartelo con tus amigos</div>
                  <div className="flex items-center gap-3 text-xl">
                    <a
                      href={`https://www.instagram.com/?url=${encodeURIComponent(pageUrl)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="hover:opacity-80" aria-label="Compartir en Instagram"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="hover:opacity-80" aria-label="Compartir en Facebook"
                    >
                      <FaFacebook />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="hover:opacity-80" aria-label="Compartir en X"
                    >
                      <FaXTwitter />
                    </a>
                    <a
                      href={`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(pageUrl)}`}
                      className="hover:opacity-80" aria-label="Compartir por email"
                    >
                      <FaEnvelope />
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + pageUrl)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="hover:opacity-80" aria-label="Compartir por WhatsApp"
                    >
                      <FaWhatsapp />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </section>
      <section>
        <ProductsCarousel />
      </section>
    </div>
  );
}

export default ProductDetail;
