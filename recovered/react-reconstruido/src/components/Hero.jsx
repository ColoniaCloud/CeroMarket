import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css/navigation";

// Slides recuperados tal cual del bundle de producción.
const slides = [
  {
    image:
      "https://api.ceromarket.com.uy/wp-content/uploads/2025/08/IMG_20231020_130104-scaled-1.jpg",
    logo: true,
    heading: "CERO plásticos, CERO limites, CERO Market",
    centered: true,
  },
  {
    image:
      "https://api.ceromarket.com.uy/wp-content/uploads/2025/08/pexels-igor-haritanovich-814387-1695052.jpg",
    logo: false,
    heading: "CAFÉ CAFÉ",
    subheading:
      "En CERO Market encontras todo lo que necesites para armar tus desayunos ricos, sanos y nutritivos.",
  },
  {
    image:
      "https://api.ceromarket.com.uy/wp-content/uploads/2025/08/IMG_20231020_130419-scaled-1.jpg",
    logo: false,
    heading: "SUPERMERCADO A GRANEL",
    subheading: "Comprá solo lo que necesites, sin desperdicios ni packaging excesivo.",
  },
];

function Hero() {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        speed={420}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="w-full h-[48vh] md:h-[56vh]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
              {slide.centered ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-8">
                  <img
                    src="https://api.ceromarket.com.uy/wp-content/uploads/2025/08/logo-cero-market-2-1.png"
                    alt="CeroMarket"
                    className="h-20 mb-4 animate-fadeInDown"
                  />
                  <h2 className="text-2xl md:text-4xl font-bold animate-fadeInUp">
                    {slide.heading}
                  </h2>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-start justify-center text-left text-white space-y-3 pl-20 pr-8 py-8 md:pl-36 md:pr-16 md:py-16">
                  <h2 className="text-4xl md:text-6xl font-bold animate-fadeInUp">
                    {slide.heading}
                  </h2>
                  <p className="text-lg md:text-xl max-w-xl animate-fadeInUp">
                    {slide.subheading}
                  </p>
                  {slide.button && (
                    <Link to={slide.button.href} className="btn-glass mt-4 inline-block">
                      {slide.button.label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Hero;
