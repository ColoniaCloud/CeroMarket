import { useEffect, useRef } from "react";
import {
  FaShoppingBasket,
  FaBoxOpen,
  FaCreditCard,
} from "react-icons/fa";

// Los 3 íconos de pasos son una aproximación semántica (ver nota en Header.jsx).
function MissionZeroWaste() {
  const iconRef = useRef(null);
  const rotateRef = useRef(null);

  useEffect(() => {
    const el = iconRef.current;
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

  useEffect(() => {
    const onScroll = () => {
      if (!rotateRef.current) return;
      const rect = rotateRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((vh - rect.top) / vh, 0), 1);
      rotateRef.current.style.transform = `rotate(${progress * 360}deg)`;
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-6 items-center mb-10">
        <div className="h-40 md:h-40 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-4">Misión CERO</h1>
          <p className="text-lg leading-relaxed">
            En CERO Market nos comprometemos a reducir residuos y fomentar
            prácticas de consumo responsables. Nuestra Misión CERO busca
            inspirar cambios diarios que reduzcan el uso de plásticos y
            promuevan una economía circular.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img
            ref={iconRef}
            src="https://api.ceromarket.com.uy/wp-content/uploads/2025/08/favicon-2-150x150-1.png"
            alt="icono misión"
            className="w-20 h-20 opacity-0 transition-all duration-700 transform"
            onLoad={() => iconRef.current?.classList.add("in-view")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="grid gap-6">
          <StepCard icon={<FaShoppingBasket />} title="1. Elegí tus productos">
            Seleccioná productos a granel según tus necesidades.
          </StepCard>
          <StepCard icon={<FaBoxOpen />} title="2. Traé tus envases">
            Usá envases reutilizables y pesalos antes de llenarlos.
          </StepCard>
          <StepCard icon={<FaCreditCard />} title="3. Pagá y seguí">
            Pesá, pagá y llevate solo lo necesario.
          </StepCard>
        </div>
        <div>
          <img
            ref={rotateRef}
            src="https://api.ceromarket.com.uy/wp-content/uploads/2025/08/89158741_GIU-AMA-211-07-scaled.jpg"
            alt="Experiencia Cero Market"
            className="w-full rounded shadow opacity-0 transform translate-y-6 transition-all duration-700"
            onLoad={() => rotateRef.current?.classList.add("in-view")}
          />
        </div>
      </div>
    </section>
  );
}

function StepCard({ icon, title, children }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow transition-transform transform hover:scale-105">
      <div className="flex items-start gap-4">
        <div className="text-2xl text-primary mt-1">{icon}</div>
        <div>
          <h3 className="font-extrabold mb-1">{title}</h3>
          <p className="text-sm">{children}</p>
        </div>
      </div>
    </div>
  );
}

export default MissionZeroWaste;
