// Arma un único mensaje de WhatsApp con todos los campos del formulario y
// lo abre en otra pestaña. No se guarda ni se envía nada a ningún servidor.
const armarMensaje = (formulario: HTMLFormElement): string => {
  const datos = [...formulario.querySelectorAll<HTMLInputElement>("[data-etiqueta]")]
    .filter((campo) => campo.value.trim())
    .map((campo) => `${campo.dataset.etiqueta}: ${campo.value.trim()}`);
  const mensaje = formulario.querySelector<HTMLTextAreaElement>("[name='text']")?.value.trim() ?? "";
  return [formulario.dataset.intro, datos.join("\n"), mensaje].filter(Boolean).join("\n\n");
};

for (const formulario of document.querySelectorAll<HTMLFormElement>("form[data-whatsapp]")) {
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const enlace = document.createElement("a");
    enlace.href = `${formulario.action}?text=${encodeURIComponent(armarMensaje(formulario))}`;
    enlace.target = "_blank";
    enlace.rel = "noopener";
    enlace.click();

    const estado = formulario.querySelector<HTMLElement>("[data-whatsapp-estado]");
    if (estado) estado.textContent = "Listo: se abrió WhatsApp en otra pestaña con tu mensaje.";
  });
}
