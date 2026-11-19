import { FaWhatsapp } from "react-icons/fa";

function AboutUs() {
  const openWhatsapp = () => {
    window.dispatchEvent(
      new CustomEvent("openWhatsappModal", {
        detail: { message: "Hola, quiero saber más sobre CERO Market." },
      }),
    );
  };

  return (
    <section className="container mx-auto px-4 py-12 min-h-[80vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src="https://api.ceromarket.com.uy/wp-content/uploads/2025/08/IMG_20220820_133737-scaled-1.jpg"
            alt="Nuestro equipo"
            className="w-full h-80 md:h-[28rem] object-cover rounded-lg shadow"
          />
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left justify-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Sobre nosotros</h1>
          <p className="text-lg leading-relaxed mb-6">
            CERO Market es un supermercado sustentable que promueve un
            consumo más responsable y consciente. Nos enfocamos en ofrecer
            productos naturales y a granel para reducir el uso de envases y
            plásticos de un solo uso. Somos una comunidad comprometida con la
            salud, la sostenibilidad y el amor por nuestro planeta.
          </p>
          <button
            onClick={openWhatsapp}
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-4 py-2 rounded-full hover:brightness-95"
          >
            <FaWhatsapp className="text-white" />
            <span>Hablemos</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
