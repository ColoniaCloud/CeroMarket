import { useQuery } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { GET_PRODUCTS_FOR_CAROUSEL } from "../graphql/products";
import ProductCard from "./ProductCard";
import "swiper/css/navigation";

function ProductsCarousel() {
  try {
    const { data, loading, error } = useQuery(GET_PRODUCTS_FOR_CAROUSEL);
    const products = data?.products?.nodes || [];

    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 text-center">
              <h3 className="text-3xl font-extrabold">Explora nuestros productos</h3>
            </div>
            <div className="ml-4">
              <a href="/productos" className="btn-glass">Ver más</a>
            </div>
          </div>
          {loading && <p>Cargando productos...</p>}
          {error && <p>Error al cargar productos.</p>}
          {!loading && !error && (
            <Swiper
              modules={[Navigation]}
              navigation
              slidesPerView={1}
              spaceBetween={16}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    );
  } catch (err) {
    console.error("ProductCarousel render error:", err);
    return (
      <section className="py-12 bg-red-50">
        <div className="container mx-auto px-4">
          <h3 className="text-lg font-semibold text-red-700">Error en ProductCarousel</h3>
          <pre className="text-sm text-left text-red-600 overflow-auto max-h-48">
            {String(err && (err.stack || err.message))}
          </pre>
        </div>
      </section>
    );
  }
}

export default ProductsCarousel;
