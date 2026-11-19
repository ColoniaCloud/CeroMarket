import { useState } from "react";

const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "59896238315";

function Careers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hola, me gustaría trabajar con CERO Market. Mi nombre es ${name}, correo: ${email}, teléfono: ${phone}. ${message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6">Trabaja con nosotros</h1>
      <p className="mb-4 text-lg">
        Estamos construyendo esta sección, pero podés enviarnos tus datos
        para contactarte cuando abramos nuevas oportunidades.
      </p>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 font-medium">Nombre</label>
          <input
            id="name" type="text" value={name}
            onChange={(e) => setName(e.target.value)}
            required className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium">Email</label>
          <input
            id="email" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            required className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-1 font-medium">Teléfono</label>
          <input
            id="phone" type="tel" value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="message" className="mb-1 font-medium">Mensaje</label>
          <textarea
            id="message" value={message}
            onChange={(e) => setMessage(e.target.value)}
            required className="p-2 border rounded resize-none" rows={4}
          />
        </div>
        <button
          type="submit"
          className="btn-glass inline-flex items-center justify-center gap-2"
        >
          Enviar por WhatsApp
        </button>
      </form>
    </section>
  );
}

export default Careers;
