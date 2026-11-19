import { useQuery } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { GET_POSTS_FOR_CAROUSEL } from "../graphql/posts";
import PostCard from "./PostCard";
import "swiper/css/navigation";

function PostsCarousel() {
  const { data, loading, error } = useQuery(GET_POSTS_FOR_CAROUSEL);
  const posts = data?.posts?.nodes || [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 text-center">
            <h3 className="text-3xl font-extrabold">Explora nuestro blog</h3>
          </div>
          <div className="ml-4">
            <a href="/blog" className="btn-glass">Ver Blog</a>
          </div>
        </div>
        {loading && <p>Cargando artículos...</p>}
        {error && <p>Error al cargar artículos.</p>}
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
            {posts.map((post) => (
              <SwiperSlide key={post.id}>
                <PostCard post={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}

export default PostsCarousel;
