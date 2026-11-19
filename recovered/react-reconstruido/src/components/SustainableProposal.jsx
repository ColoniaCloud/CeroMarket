import { useEffect, useRef } from "react";

function SustainableProposal() {
  const imgRef = useRef(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in-view");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 order-2 md:order-1">
          <h3 className="text-4xl md:text-6xl font-extrabold mb-4">
            Una propuesta sustentable
          </h3>
          <p className="text-lg leading-relaxed">
            Proponemos opciones alternativas, con el propósito de inspirar y
            ayudar a reducir el consumo de plástico de un solo uso, y de esta
            manera, volver a conectar con la Tierra. Más que un supermercado
            sustentable, somos una comunidad de personas que cuida el
            planeta.
            <br />
            <br />
            ¡Viví tu experiencia CERO Market!
          </p>
        </div>
        <div className="md:w-1/2 order-1 md:order-2 flex justify-center">
          <img
            ref={imgRef}
            src="https://api.ceromarket.com.uy/wp-content/uploads/2025/08/Group-15-1.png"
            alt="Ilustración sustentable"
            className="w-[70%] md:w-[70%] h-auto object-contain transform transition-all duration-700 ease-out opacity-0 translate-y-6"
          />
        </div>
      </div>
    </section>
  );
}

export default SustainableProposal;
