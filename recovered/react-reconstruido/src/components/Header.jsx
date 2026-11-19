import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaWhatsapp,
  FaBars,
  FaTimes,
  FaEnvelope,
  FaFacebook,
  FaLeaf,
  FaBullseye,
  FaShoppingBasket,
  FaBlog,
  FaUtensils,
  FaBriefcase,
} from "react-icons/fa";

const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "59896238315";

// Los íconos son una aproximación: el bundle minificado no conserva los
// nombres originales de react-icons, solo referencias de una letra. Se
// eligieron equivalentes semánticos razonables para cada uso.
function Header() {
  const [chatOpen, setChatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const openFromEvent = (e) => {
      setChatOpen(true);
      if (e?.detail?.message) setMessage(e.detail.message);
    };
    window.addEventListener("openWhatsappModal", openFromEvent);
    return () => window.removeEventListener("openWhatsappModal", openFromEvent);
  }, []);

  const sendMessage = () => {
    if (!message) return;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    setChatOpen(false);
    setMessage("");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-dark text-white h-16 overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 w-1/3 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 50%, rgba(121,202,189,0.3), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-1/3 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 80% 50%, rgba(121,202,189,0.3), transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto flex items-center justify-between px-4 h-full">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://api.ceromarket.com.uy/wp-content/uploads/2025/08/logo-cero-market-2-1.png"
            alt="CeroMarket logo"
            className="h-8 w-auto"
          />
        </Link>
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/ceromarketuruguay/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:opacity-75 transition-opacity"
          >
            <FaInstagram />
          </a>
          <button
            onClick={() => setChatOpen(true)}
            className="btn-glass flex items-center gap-2 text-sm"
          >
            <FaWhatsapp />
            <span>Hablemos</span>
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="btn-glass p-2 text-lg"
            aria-label="Abrir menú"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Modal de chat estilo WhatsApp */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur"
            onClick={() => setChatOpen(false)}
          />
          <div
            className={`relative bg-[#0b141a] text-white w-full max-w-md h-full shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${
              chatOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="bg-[#202c33] p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://api.ceromarket.com.uy/wp-content/uploads/2025/08/favicon-2-150x150-1.png"
                  alt="CeroMarket"
                  className="h-10 w-10 rounded-full object-cover bg-white p-1"
                />
                <div>
                  <h3 className="font-semibold">CERO Market</h3>
                  <p className="text-xs text-gray-400">en línea</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-xl text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>
            <div className="flex-1 p-4 flex flex-col items-start z-10 relative">
              <div className="bg-[#202c33] p-2 rounded-lg shadow-md self-start max-w-xs mb-4">
                <p className="text-sm">
                  ¡Hola! 👋 ¿Cómo podemos ayudarte? Escribe tu consulta y te
                  responderemos a la brevedad.
                </p>
              </div>
            </div>
            <div className="bg-[#202c33] p-2 flex items-center gap-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-2 border-none rounded-full resize-none focus:ring-0 bg-[#2a3942] text-white placeholder-gray-400"
                placeholder="Escribe un mensaje aquí"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!message}
                className="bg-[#00a884] text-white rounded-full w-11 h-11 flex items-center justify-center transition-transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Menú lateral */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="relative bg-dark text-white w-3/4 md:w-1/4 h-full shadow-xl ml-auto transform transition-transform duration-300 overflow-hidden flex flex-col"
            style={{ transform: menuOpen ? "translateX(0%)" : "translateX(100%)" }}
          >
            <div className="relative z-10 p-4 flex justify-between items-center border-b border-white/10">
              <img
                src="https://api.ceromarket.com.uy/wp-content/uploads/2025/08/logo.png"
                alt="CeroMarket logo"
                className="h-8"
              />
              <button onClick={() => setMenuOpen(false)} className="text-2xl">
                <FaTimes />
              </button>
            </div>
            <nav className="relative z-10 p-4 flex-1 overflow-y-auto flex flex-col gap-2">
              <NavItem to="/sobre-nosotros" icon={<FaLeaf />} onClick={() => setMenuOpen(false)}>
                Sobre nosotros
              </NavItem>
              <NavItem to="/mision-zero-waste" icon={<FaBullseye />} onClick={() => setMenuOpen(false)}>
                Misión CERO
              </NavItem>
              <hr className="border-white/10 my-2" />
              <NavItem to="/productos" icon={<FaShoppingBasket />} onClick={() => setMenuOpen(false)}>
                Nuestros productos
              </NavItem>
              <NavItem to="/blog" icon={<FaBlog />} onClick={() => setMenuOpen(false)}>
                Blog
              </NavItem>
              <NavItem to="/recetas" icon={<FaUtensils />} onClick={() => setMenuOpen(false)}>
                Recetas saludables
              </NavItem>
              <hr className="border-white/10 my-2" />
              <NavItem to="/contacto" icon={<FaEnvelope />} onClick={() => setMenuOpen(false)}>
                Contacto
              </NavItem>
              <NavItem to="/trabaja-con-nosotros" icon={<FaBriefcase />} onClick={() => setMenuOpen(false)}>
                Trabaja con nosotros
              </NavItem>
            </nav>
            <div className="relative z-10 p-4 border-t border-white/10">
              <div className="flex items-center gap-4 text-xl">
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
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavItem({ to, icon, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-2 rounded-md px-2 py-2 transition-all duration-300 ease-out hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20"
    >
      {icon} <span>{children}</span>
    </Link>
  );
}

export default Header;
