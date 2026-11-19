import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "59896238315";

function Footer() {
  return (
    <footer className="bg-dark text-white relative mt-12 overflow-visible md:overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 w-1/3 pointer-events-none hidden md:block"
        style={{
          background:
            "radial-gradient(circle at 20% 50%, rgba(121,202,189,0.3), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-1/3 pointer-events-none hidden md:block"
        style={{
          background:
            "radial-gradient(circle at 80% 50%, rgba(121,202,189,0.3), transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-[4.4rem] md:py-[3.3rem] grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="md:order-1 flex flex-col items-center md:items-start">
          <img
            src="https://api.ceromarket.com.uy/wp-content/uploads/2025/08/logo.png"
            alt="CeroMarket logo"
            className="h-8 mb-4"
          />
          <p className="text-sm leading-relaxed mb-4 max-w-md">
            Somos un supermercado sustentable enfocado en reducir el uso de
            plásticos y ofrecer productos naturales a granel. Buscamos
            fomentar una vida más sana y consciente, conectando a nuestra
            comunidad con alimentos de calidad y hábitos respetuosos con el
            planeta.
          </p>
          <a
            href="https://maps.app.goo.gl/8MRDmZoYJKFR5Zbv6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-primary mb-2"
          >
            <FaMapMarkerAlt />
            <span className="font-bold">José Martí 3441, Pocitos, Montevideo</span>
          </a>
          <div className="flex items-center gap-2 text-sm">
            <FaClock />
            <span className="font-bold">De 9AM a 21PM</span>
          </div>
        </div>

        <div className="md:order-2 flex items-start justify-center">
          <div>
            <h4 className="text-lg font-semibold mb-2">Enlaces rápidos</h4>
            <ul className="space-y-1 text-sm text-center">
              <li><Link to="/" className="hover:text-primary">Inicio</Link></li>
              <li><Link to="/productos" className="hover:text-primary">Productos</Link></li>
              <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link to="/contacto" className="hover:text-primary">Contacto</Link></li>
              <li><Link to="/trabaja-con-nosotros" className="hover:text-primary">Trabaja con nosotros</Link></li>
            </ul>
          </div>
        </div>

        <div className="md:order-3 flex flex-col items-center md:items-end">
          <div className="flex gap-3 mt-0 text-xl">
            <a href="https://www.instagram.com/ceromarketuruguay/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/ceromarketuruguay/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <FaFacebook />
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <FaWhatsapp />
            </a>
            <a href="mailto:hola@ceromarket.com.uy" className="hover:text-primary">
              <FaEnvelope />
            </a>
          </div>
          <div className="mt-4 text-sm">
            <a href="/politica-de-privacidad" className="hover:text-primary">Política de privacidad</a>
            <span className="mx-2">|</span>
            <a href="/terminos-y-condiciones" className="hover:text-primary">Términos y condiciones</a>
          </div>
          <p className="text-sm mt-4 font-bold">
            © {new Date().getFullYear()} CERO Market. Todos los derechos reservados.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[10px]">Developed by</span>
            <a
              href="https://wpuruguay.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-200 hover:opacity-100"
            >
              <img
                src="https://wpuruguay.com/wp-content/uploads/2025/08/Logo.png"
                alt="WP Uruguay"
                className="h-[20px] opacity-50"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
