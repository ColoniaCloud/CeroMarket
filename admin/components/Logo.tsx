// Logo de la pantalla de ingreso. Solo hay el logo en PNG chico (144 px de
// ancho): se muestra a su tamaño real. Con un SVG se vería nítido en pantallas
// de alta densidad; reemplazar public/logo-apilado.png y ajustar acá.
export const Logo = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/logo-apilado.png" alt="CERO Market" width={144} height={113} style={{ display: "block", margin: "0 auto" }} />
);
