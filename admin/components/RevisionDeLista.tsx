"use client";
// Pantalla de revisión de una lista de precios: se ve qué va a pasar (precios
// que cambian, productos nuevos, productos para vincular con su código del
// CRM, conflictos y los que ya no están) y recién con "Aplicar" se cambia el
// catálogo. Lo que se va decidiendo se guarda en el navegador por si se
// recarga la página.
import { useDocumentInfo } from "@payloadcms/ui";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Analisis, Nuevo } from "../lib/lista/analizar";
import { decisionesVacias, type Decisiones, type ResultadoDeAplicar } from "../lib/lista/decisiones";
import "./RevisionDeLista.css";

type Estado = "pendiente" | "aplicando" | "aplicada" | "error";
type Documento = {
  id: number | string;
  estado: Estado;
  progreso?: number | null;
  analisis?: Analisis | null;
  resultado?: Partial<ResultadoDeAplicar> | null;
};
type Pestana = "vincular" | "precios" | "nuevos" | "conflictos" | "yaNoEstan" | "ignoradas";

const LIMITE_CAMBIO_GRANDE = 30;
// El botón de sugerencias solo acepta coincidencias de este puntaje o más.
const MINIMO_ACEPTAR_EN_BLOQUE = 0.8;
const POR_PAGINA = 50;

const pesos = new Intl.NumberFormat("es-UY", { style: "currency", currency: "UYU", maximumFractionDigits: 0 });
const dinero = (valor: number | null | undefined): string => (valor == null ? "—" : pesos.format(valor));
const porcentaje = (antes: number | null, despues: number): number | null =>
  antes ? Math.round(((despues - antes) / antes) * 100) : null;
const sinAcentos = (texto: string): string => texto.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

const inicial = (analisis: Analisis): Decisiones => {
  const decisiones = decisionesVacias();
  for (const producto of analisis.vincular) {
    decisiones.vinculos[String(producto.productoId)] = producto.confianza === "segura" ? (producto.candidatos[0]?.codigo ?? null) : null;
  }
  // Un precio que cambia mucho suele ser un error de carga: arranca sin tildar.
  decisiones.noActualizarPrecios = analisis.precios
    .filter((cambio) => {
      const variacion = porcentaje(cambio.antes, cambio.despues);
      return variacion !== null && Math.abs(variacion) > LIMITE_CAMBIO_GRANDE;
    })
    .map((cambio) => cambio.productoId);
  decisiones.noDisponibles = analisis.yaNoEstanSospechoso ? [] : analisis.yaNoEstan.map((producto) => producto.productoId);
  return decisiones;
};

const cargarGuardadas = (id: string | number): Decisiones | null => {
  try {
    const texto = localStorage.getItem(`cero-lista-${id}`);
    return texto ? { ...decisionesVacias(), ...(JSON.parse(texto) as Partial<Decisiones>) } : null;
  } catch {
    return null;
  }
};

export const RevisionDeLista = () => {
  const { id } = useDocumentInfo();
  const [documento, setDocumento] = useState<Documento | null>(null);
  const [error, setError] = useState("");
  const [decisiones, setDecisiones] = useState<Decisiones | null>(null);
  const [pestana, setPestana] = useState<Pestana>("vincular");
  const [enviando, setEnviando] = useState(false);
  const estadoAnterior = useRef<Estado | null>(null);

  const cargar = useCallback(async () => {
    if (!id) return;
    try {
      const respuesta = await fetch(`/api/importaciones/${id}?depth=0`, { credentials: "include" });
      if (!respuesta.ok) throw new Error(String(respuesta.status));
      const nuevo = (await respuesta.json()) as Documento;
      // Al terminar de aplicar se recarga la página para que el estado de la
      // barra lateral (que viene del servidor) quede al día.
      if (estadoAnterior.current === "aplicando" && nuevo.estado !== "aplicando") {
        window.location.reload();
        return;
      }
      estadoAnterior.current = nuevo.estado;
      setDocumento(nuevo);
    } catch {
      setError("No se pudo cargar la lista. Recargá la página.");
    }
  }, [id]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  // Mientras se aplica, se consulta el avance cada pocos segundos.
  useEffect(() => {
    if (documento?.estado !== "aplicando") return;
    const intervalo = window.setInterval(() => void cargar(), 2500);
    return () => window.clearInterval(intervalo);
  }, [documento?.estado, cargar]);

  const analisis = documento?.analisis ?? null;
  useEffect(() => {
    if (!analisis || !documento || decisiones) return;
    setDecisiones(cargarGuardadas(documento.id) ?? inicial(analisis));
  }, [analisis, documento, decisiones]);

  useEffect(() => {
    if (!decisiones || !documento) return;
    try {
      localStorage.setItem(`cero-lista-${documento.id}`, JSON.stringify(decisiones));
    } catch {
      // Sin almacenamiento: se pierde al recargar, nada más.
    }
  }, [decisiones, documento]);

  const reiniciar = () => {
    if (!analisis || !documento) return;
    if (!window.confirm("Se pierden las elecciones que hiciste y se vuelve a lo que propuso el sistema. ¿Seguir?")) return;
    try {
      localStorage.removeItem(`cero-lista-${documento.id}`);
    } catch {
      // Nada que limpiar.
    }
    setDecisiones(inicial(analisis));
  };

  const cambiar = (cambio: (previas: Decisiones) => Decisiones) => setDecisiones((previas) => (previas ? cambio(previas) : previas));

  // ---- Derivados ----
  const codigosVinculados = useMemo(() => {
    const codigos = new Map<string, number>();
    for (const codigo of Object.values(decisiones?.vinculos ?? {})) if (codigo) codigos.set(codigo, (codigos.get(codigo) ?? 0) + 1);
    return codigos;
  }, [decisiones?.vinculos]);
  const repetidos = [...codigosVinculados].filter(([, veces]) => veces > 1).map(([codigo]) => codigo);

  const nuevosDisponibles = useMemo(
    () => (analisis?.nuevos ?? []).filter((nuevo) => !codigosVinculados.has(nuevo.codigo)),
    [analisis?.nuevos, codigosVinculados],
  );

  if (!id) return <p className="rl-aviso">Subí el PDF y guardá: apenas se lea, acá aparece la revisión.</p>;
  if (error) return <p className="rl-aviso rl-aviso--error">{error}</p>;
  if (!documento) return <p className="rl-aviso">Cargando la lista…</p>;

  if (documento.estado === "aplicando") {
    return (
      <div className="rl">
        <h3>Aplicando la lista…</h3>
        <progress max={100} value={documento.progreso ?? 0} className="rl-progreso" />
        <p className="rl-pie">
          {documento.progreso ?? 0}%. Podés cerrar esta página: el proceso sigue en el servidor y el sitio se actualiza solo al terminar.
        </p>
      </div>
    );
  }

  if (documento.estado === "aplicada" || (documento.estado === "error" && documento.resultado)) {
    const r = documento.resultado ?? {};
    const errores = r.errores ?? [];
    return (
      <div className="rl">
        <h3>{documento.estado === "aplicada" ? "Lista aplicada" : "No se pudo aplicar la lista"}</h3>
        {documento.estado === "aplicada" && (
          <ul className="rl-resumen">
            <li><strong>{r.preciosActualizados ?? 0}</strong> precios actualizados</li>
            <li><strong>{r.vinculados ?? 0}</strong> productos vinculados con su código</li>
            <li><strong>{r.creados ?? 0}</strong> productos nuevos</li>
            <li><strong>{r.categoriasCreadas ?? 0}</strong> categorías nuevas</li>
            <li><strong>{r.noDisponibles ?? 0}</strong> marcados como no disponibles</li>
            <li><strong>{r.ignorados ?? 0}</strong> descartados para siempre</li>
          </ul>
        )}
        {errores.length > 0 && (
          <div className="rl-aviso rl-aviso--error">
            <strong>{errores.length} {errores.length === 1 ? "problema" : "problemas"}:</strong>
            <ul>{errores.map((texto) => <li key={texto}>{texto}</li>)}</ul>
          </div>
        )}
        <p className="rl-pie">El sitio se vuelve a publicar solo; los cambios se ven en ceromarket.com.uy en unos minutos.</p>
        <a className="rl-boton" href="/admin/collections/productos">Ver los productos</a>
      </div>
    );
  }

  if (!analisis || !decisiones) return <p className="rl-aviso">Preparando la revisión…</p>;

  // ---- Resumen de lo que se va a hacer ----
  const vinculados = Object.values(decisiones.vinculos).filter(Boolean).length;
  const sinVincular = analisis.vincular.length - vinculados;
  const preciosAplicados = analisis.precios.filter((cambio) => !decisiones.noActualizarPrecios.includes(cambio.productoId)).length;
  const aCrear = nuevosDisponibles.filter((nuevo) => !decisiones.noCrear.includes(nuevo.codigo)).length;
  const conflictosResueltos = Object.values(decisiones.conflictos).filter((precio) => precio != null).length;
  const hayAlgo = vinculados + preciosAplicados + aCrear + decisiones.noDisponibles.length + conflictosResueltos > 0;

  const aplicar = async () => {
    const lineas = [
      vinculados > 0 && `vincular ${vinculados} productos con su código y ponerles precio`,
      preciosAplicados > 0 && `actualizar ${preciosAplicados} precios`,
      aCrear > 0 && `crear ${aCrear} productos nuevos (quedan publicados)`,
      decisiones.noDisponibles.length > 0 && `marcar ${decisiones.noDisponibles.length} productos como no disponibles`,
    ].filter(Boolean);
    if (!window.confirm(`Vas a ${lineas.join(", ")}.\n\nEl sitio se vuelve a publicar solo. ¿Aplicar?`)) return;
    setEnviando(true);
    try {
      const respuesta = await fetch(`/api/importaciones/${documento.id}/aplicar`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(decisiones),
      });
      if (!respuesta.ok) {
        const cuerpo = (await respuesta.json().catch(() => ({}))) as { error?: string };
        throw new Error(cuerpo.error ?? `Error ${respuesta.status}`);
      }
      try {
        localStorage.removeItem(`cero-lista-${documento.id}`);
      } catch {
        // Nada que limpiar.
      }
      await cargar();
    } catch (fallo) {
      setError(fallo instanceof Error ? fallo.message : "No se pudo aplicar.");
    } finally {
      setEnviando(false);
    }
  };

  const pestanas: { clave: Pestana; texto: string; cantidad: number }[] = [
    { clave: "vincular", texto: "Vincular", cantidad: analisis.vincular.length },
    { clave: "precios", texto: "Precios", cantidad: analisis.precios.length },
    { clave: "nuevos", texto: "Productos nuevos", cantidad: nuevosDisponibles.length },
    { clave: "conflictos", texto: "Conflictos", cantidad: analisis.conflictos.length },
    { clave: "yaNoEstan", texto: "Ya no están", cantidad: analisis.yaNoEstan.length },
    { clave: "ignoradas", texto: "Ignorados", cantidad: analisis.ignoradas.length },
  ];

  return (
    <div className="rl">
      <p className="rl-pie">
        {analisis.archivo.lista} · {analisis.archivo.fecha ?? "sin fecha"} · {analisis.archivo.paginas} páginas · {analisis.archivo.filas} filas leídas ·{" "}
        <button type="button" className="rl-enlace" onClick={reiniciar}>Volver a empezar la revisión</button>
      </p>
      {analisis.advertencias.length > 0 && (
        <div className="rl-aviso rl-aviso--error">
          <strong>Filas que no se pudieron leer:</strong>
          <ul>{analisis.advertencias.slice(0, 10).map((texto) => <li key={texto}>{texto}</li>)}</ul>
        </div>
      )}

      <div role="tablist" className="rl-pestanas">
        {pestanas.filter((p) => p.cantidad > 0).map((p) => (
          <button key={p.clave} type="button" role="tab" aria-selected={pestana === p.clave} onClick={() => setPestana(p.clave)} className="rl-pestana">
            {p.texto} <span className="rl-cuenta">{p.cantidad}</span>
          </button>
        ))}
      </div>

      {pestana === "vincular" && <Vincular analisis={analisis} decisiones={decisiones} cambiar={cambiar} libres={analisis.nuevos} />}
      {pestana === "precios" && <Precios analisis={analisis} decisiones={decisiones} cambiar={cambiar} />}
      {pestana === "nuevos" && <Nuevos analisis={analisis} nuevos={nuevosDisponibles} decisiones={decisiones} cambiar={cambiar} />}
      {pestana === "conflictos" && <Conflictos analisis={analisis} decisiones={decisiones} cambiar={cambiar} />}
      {pestana === "yaNoEstan" && <YaNoEstan analisis={analisis} decisiones={decisiones} cambiar={cambiar} />}
      {pestana === "ignoradas" && <Ignoradas analisis={analisis} />}

      <div className="rl-barra">
        <p>
          {repetidos.length > 0 ? (
            <strong className="rl-error">Hay códigos elegidos para dos productos: {repetidos.join(", ")}. Corregilo en «Vincular».</strong>
          ) : (
            <>
              <strong>{vinculados}</strong> vinculados · <strong>{preciosAplicados}</strong> precios · <strong>{aCrear}</strong> nuevos ·{" "}
              <strong>{decisiones.noDisponibles.length}</strong> no disponibles
              {sinVincular > 0 && <> · <span className="rl-gris">{sinVincular} de la web sin vincular</span></>}
            </>
          )}
        </p>
        <button type="button" className="rl-boton" disabled={enviando || repetidos.length > 0 || !hayAlgo} onClick={() => void aplicar()}>
          {enviando ? "Enviando…" : "Aplicar cambios"}
        </button>
      </div>
    </div>
  );
};

type Props = {
  analisis: Analisis;
  decisiones: Decisiones;
  cambiar: (cambio: (previas: Decisiones) => Decisiones) => void;
};

// ---------- Vincular ----------
const Vincular = ({ analisis, decisiones, cambiar, libres }: Props & { libres: Nuevo[] }) => {
  const [soloSinVincular, setSoloSinVincular] = useState(false);
  const [busqueda, setBusqueda] = useState<Record<number, string>>({});
  const filaPorCodigo = useMemo(() => new Map(analisis.filas.map((fila) => [fila.c, fila])), [analisis.filas]);
  const elegir = (productoId: number, codigo: string | null) =>
    cambiar((previas) => ({ ...previas, vinculos: { ...previas.vinculos, [String(productoId)]: codigo } }));
  const filas = analisis.vincular.filter((producto) => !soloSinVincular || !decisiones.vinculos[String(producto.productoId)]);
  const etiqueta = (codigo: string) => {
    const fila = filaPorCodigo.get(codigo);
    return fila ? `${fila.a} · ${dinero(fila.p)} · cód. ${codigo}` : codigo;
  };
  // Acepta la mejor sugerencia de los productos que todavía no tienen elegida,
  // pero solo las de 80% o más y sin repetir códigos: gana el de mayor
  // coincidencia y el resto queda para elegir a mano. Una coincidencia floja
  // puede ponerle a un producto el precio de otro.
  const aceptarSugeridos = () =>
    cambiar((previas) => {
      const vinculos = { ...previas.vinculos };
      const tomados = new Set(Object.values(vinculos).filter(Boolean) as string[]);
      const pendientes = analisis.vincular
        .filter((producto) => !vinculos[String(producto.productoId)] && (producto.candidatos[0]?.puntaje ?? 0) >= MINIMO_ACEPTAR_EN_BLOQUE)
        .sort((a, b) => (b.candidatos[0]?.puntaje ?? 0) - (a.candidatos[0]?.puntaje ?? 0));
      for (const producto of pendientes) {
        const codigo = producto.candidatos[0]!.codigo;
        if (tomados.has(codigo)) continue;
        vinculos[String(producto.productoId)] = codigo;
        tomados.add(codigo);
      }
      return { ...previas, vinculos };
    });
  const veces = new Map<string, number>();
  for (const codigo of Object.values(decisiones.vinculos)) if (codigo) veces.set(codigo, (veces.get(codigo) ?? 0) + 1);

  return (
    <section>
      <p className="rl-ayuda">
        Estos productos de la web todavía no tienen código del CRM. Elegí a qué artículo de la lista corresponde cada uno: desde ahí
        el precio se actualiza solo cada mes. Las coincidencias «seguras» ya vienen elegidas; revisá las demás.
      </p>
      <div className="rl-herramientas">
        <label><input type="checkbox" checked={soloSinVincular} onChange={(e) => setSoloSinVincular(e.target.checked)} /> Mostrar solo los sin vincular</label>
        <button type="button" className="rl-boton rl-boton--chico" onClick={aceptarSugeridos}>Aceptar las sugerencias de {Math.round(MINIMO_ACEPTAR_EN_BLOQUE * 100)}% o más</button>
      </div>
      <table className="rl-tabla">
        <thead><tr><th>Producto de la web</th><th>Artículo de la lista</th><th>Coincidencia</th></tr></thead>
        <tbody>
          {filas.map((producto) => {
            const clave = String(producto.productoId);
            const actual = decisiones.vinculos[clave] ?? "";
            const texto = busqueda[producto.productoId] ?? "";
            const resultados = texto.length >= 2
              ? libres.filter((fila) => sinAcentos(`${fila.articulo} ${fila.codigo}`).includes(sinAcentos(texto))).slice(0, 12)
              : [];
            const opciones = new Map<string, string>(producto.candidatos.map((candidato) => [candidato.codigo, `${etiqueta(candidato.codigo)} (${Math.round(candidato.puntaje * 100)}%)`]));
            if (actual && !opciones.has(actual)) opciones.set(actual, etiqueta(actual));
            for (const fila of resultados) if (!opciones.has(fila.codigo)) opciones.set(fila.codigo, `${fila.articulo} · ${dinero(fila.precio)} · cód. ${fila.codigo}`);
            return (
              <tr key={producto.productoId} className={actual && (veces.get(actual) ?? 0) > 1 ? "rl-fila--alerta" : undefined}>
                <td>
                  <strong>{producto.nombre}</strong>
                  {producto.detalle && <div className="rl-gris">{producto.detalle}</div>}
                </td>
                <td>
                  <select value={actual} onChange={(e) => elegir(producto.productoId, e.target.value || null)} aria-label={`Artículo para ${producto.nombre}`}>
                    <option value="">— No está en la lista —</option>
                    {[...opciones].map(([codigo, descripcion]) => <option key={codigo} value={codigo}>{descripcion}</option>)}
                  </select>
                  <input
                    type="search"
                    placeholder="Buscar otro artículo…"
                    value={texto}
                    onChange={(e) => setBusqueda((previas) => ({ ...previas, [producto.productoId]: e.target.value }))}
                    aria-label={`Buscar otro artículo para ${producto.nombre}`}
                    className="rl-buscar"
                  />
                </td>
                <td>
                  <span className={`rl-insignia rl-insignia--${producto.confianza}`}>
                    {producto.confianza === "segura" ? "Segura" : producto.confianza === "revisar" ? "Revisar" : "Sin par claro"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

// ---------- Precios ----------
const Precios = ({ analisis, decisiones, cambiar }: Props) => {
  const [soloGrandes, setSoloGrandes] = useState(false);
  const excluidos = new Set(decisiones.noActualizarPrecios);
  const filas = analisis.precios.filter((cambio) => {
    if (!soloGrandes) return true;
    const variacion = porcentaje(cambio.antes, cambio.despues);
    return variacion !== null && Math.abs(variacion) > LIMITE_CAMBIO_GRANDE;
  });
  const alternar = (productoId: number) =>
    cambiar((previas) => ({
      ...previas,
      noActualizarPrecios: excluidos.has(productoId)
        ? previas.noActualizarPrecios.filter((id) => id !== productoId)
        : [...previas.noActualizarPrecios, productoId],
    }));
  return (
    <section>
      <p className="rl-ayuda">
        Productos que ya tienen código y cuyo precio cambió. {analisis.sinCambios} más no cambiaron. Los que suben o bajan más de un{" "}
        {LIMITE_CAMBIO_GRANDE}% vienen sin tildar porque suelen ser errores de carga en el CRM. Los productos que vincules en la otra
        pestaña reciben su precio al aplicar.
      </p>
      <div className="rl-herramientas">
        <label><input type="checkbox" checked={soloGrandes} onChange={(e) => setSoloGrandes(e.target.checked)} /> Mostrar solo cambios de más del {LIMITE_CAMBIO_GRANDE}%</label>
      </div>
      <table className="rl-tabla">
        <thead><tr><th>Aplicar</th><th>Producto</th><th>Código</th><th>Antes</th><th>Ahora</th><th>Cambio</th></tr></thead>
        <tbody>
          {filas.map((cambio) => {
            const variacion = porcentaje(cambio.antes, cambio.despues);
            const grande = variacion !== null && Math.abs(variacion) > LIMITE_CAMBIO_GRANDE;
            return (
              <tr key={cambio.productoId} className={grande ? "rl-fila--alerta" : undefined}>
                <td><input type="checkbox" checked={!excluidos.has(cambio.productoId)} onChange={() => alternar(cambio.productoId)} aria-label={`Aplicar el precio de ${cambio.nombre}`} /></td>
                <td>{cambio.nombre}</td>
                <td>{cambio.codigo}</td>
                <td>{dinero(cambio.antes)}</td>
                <td><strong>{dinero(cambio.despues)}</strong></td>
                <td>{variacion === null ? "nuevo" : `${variacion > 0 ? "+" : ""}${variacion}%`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

// ---------- Productos nuevos ----------
const Nuevos = ({ analisis, nuevos, decisiones, cambiar }: Props & { nuevos: Nuevo[] }) => {
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [pagina, setPagina] = useState(0);
  const noCrear = new Set(decisiones.noCrear);
  const filtrados = useMemo(() => {
    const clave = sinAcentos(texto);
    return nuevos.filter((nuevo) => {
      const actual = decisiones.cambios[nuevo.codigo]?.categoria ?? nuevo.categoria;
      return (!categoria || actual === categoria) && (!clave || sinAcentos(`${nuevo.nombre} ${nuevo.articulo} ${nuevo.marca} ${nuevo.codigo}`).includes(clave));
    });
  }, [nuevos, texto, categoria, decisiones.cambios]);
  const visibles = filtrados.slice(pagina * POR_PAGINA, (pagina + 1) * POR_PAGINA);
  const paginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  const nuevasCategorias = analisis.categorias.filter((c) => c.nueva);

  const ajustar = (codigo: string, parte: Partial<NonNullable<Decisiones["cambios"][string]>>) =>
    cambiar((previas) => ({ ...previas, cambios: { ...previas.cambios, [codigo]: { ...previas.cambios[codigo], ...parte } } }));
  const marcarVisibles = (crear: boolean) =>
    cambiar((previas) => {
      const conjunto = new Set(previas.noCrear);
      for (const nuevo of filtrados) crear ? conjunto.delete(nuevo.codigo) : conjunto.add(nuevo.codigo);
      return { ...previas, noCrear: [...conjunto] };
    });

  return (
    <section>
      <p className="rl-ayuda">
        Artículos de la lista que no están en la web. Se crean <strong>publicados</strong>, con el precio de la lista. Revisá el nombre, la
        categoría y si es a granel. Lo que destildes <strong>no se crea y no vuelve a aparecer</strong> en las próximas listas (se puede
        deshacer en Administración → Códigos ignorados).
        {nuevasCategorias.length > 0 && <> Se van a crear las categorías: {nuevasCategorias.map((c) => c.nombre).join(", ")}.</>}
      </p>
      <div className="rl-herramientas">
        <input type="search" placeholder="Buscar por nombre, marca o código…" value={texto} onChange={(e) => { setTexto(e.target.value); setPagina(0); }} />
        <select value={categoria} onChange={(e) => { setCategoria(e.target.value); setPagina(0); }} aria-label="Filtrar por categoría">
          <option value="">Todas las categorías</option>
          {analisis.categorias.map((c) => <option key={c.slug} value={c.slug}>{c.nombre}</option>)}
        </select>
        <button type="button" className="rl-boton rl-boton--chico" onClick={() => marcarVisibles(true)}>Tildar los {filtrados.length} filtrados</button>
        <button type="button" className="rl-boton rl-boton--chico" onClick={() => marcarVisibles(false)}>Destildar los {filtrados.length} filtrados</button>
      </div>
      <table className="rl-tabla">
        <thead><tr><th>Crear</th><th>Nombre</th><th>Categoría</th><th>Venta</th><th>Precio</th></tr></thead>
        <tbody>
          {visibles.map((nuevo) => {
            const ajuste = decisiones.cambios[nuevo.codigo] ?? {};
            const venta = ajuste.venta ?? nuevo.venta;
            const unidad = ajuste.unidad ?? nuevo.unidad;
            return (
              <tr key={nuevo.codigo} className={noCrear.has(nuevo.codigo) ? "rl-fila--apagada" : undefined}>
                <td>
                  <input
                    type="checkbox"
                    checked={!noCrear.has(nuevo.codigo)}
                    onChange={() =>
                      cambiar((previas) => ({
                        ...previas,
                        noCrear: noCrear.has(nuevo.codigo) ? previas.noCrear.filter((c) => c !== nuevo.codigo) : [...previas.noCrear, nuevo.codigo],
                      }))
                    }
                    aria-label={`Crear ${nuevo.nombre}`}
                  />
                </td>
                <td>
                  <input value={ajuste.nombre ?? nuevo.nombre} onChange={(e) => ajustar(nuevo.codigo, { nombre: e.target.value })} aria-label={`Nombre de ${nuevo.articulo}`} className="rl-nombre" />
                  <div className="rl-gris">
                    {[nuevo.marca, nuevo.presentacion].filter(Boolean).join(" · ")}
                    {(nuevo.marca || nuevo.presentacion) && " · "}en la lista: {nuevo.articulo} (cód. {nuevo.codigo})
                  </div>
                </td>
                <td>
                  <select value={ajuste.categoria ?? nuevo.categoria} onChange={(e) => ajustar(nuevo.codigo, { categoria: e.target.value })} aria-label={`Categoría de ${nuevo.nombre}`}>
                    {analisis.categorias.map((c) => <option key={c.slug} value={c.slug}>{c.nombre}{c.nueva ? " (nueva)" : ""}</option>)}
                  </select>
                </td>
                <td>
                  <select value={venta === "granel" ? `granel-${unidad}` : "empaquetado"} onChange={(e) => {
                    const valor = e.target.value;
                    if (valor === "empaquetado") ajustar(nuevo.codigo, { venta: "empaquetado" });
                    else ajustar(nuevo.codigo, { venta: "granel", unidad: valor === "granel-litro" ? "litro" : "kilo" });
                  }} aria-label={`Venta de ${nuevo.nombre}`}>
                    <option value="empaquetado">Empaquetado</option>
                    <option value="granel-kilo">A granel (por kilo)</option>
                    <option value="granel-litro">A granel (por litro)</option>
                  </select>
                </td>
                <td>{dinero(nuevo.precio)}{venta === "granel" && <span className="rl-gris"> el {unidad}</span>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="rl-paginas">
        <button type="button" className="rl-boton rl-boton--chico" disabled={pagina === 0} onClick={() => setPagina(pagina - 1)}>Anterior</button>
        <span>Página {pagina + 1} de {paginas} · {filtrados.length} productos</span>
        <button type="button" className="rl-boton rl-boton--chico" disabled={pagina + 1 >= paginas} onClick={() => setPagina(pagina + 1)}>Siguiente</button>
      </div>
    </section>
  );
};

// ---------- Conflictos ----------
const Conflictos = ({ analisis, decisiones, cambiar }: Props) => (
  <section>
    <p className="rl-ayuda">
      El mismo código aparece más de una vez con precios distintos. Elegí cuál es el correcto; si no elegís ninguno, ese artículo no se
      toca. Si el código no está en la web, se crea un producto nuevo con el precio elegido.
    </p>
    <table className="rl-tabla">
      <thead><tr><th>Código</th><th>Artículo</th><th>Precio a usar</th></tr></thead>
      <tbody>
        {analisis.conflictos.map((conflicto) => (
          <tr key={conflicto.codigo}>
            <td>{conflicto.codigo}</td>
            <td>{conflicto.articulo}</td>
            <td>
              <select
                value={decisiones.conflictos[conflicto.codigo] ?? ""}
                onChange={(e) => cambiar((previas) => ({ ...previas, conflictos: { ...previas.conflictos, [conflicto.codigo]: e.target.value ? Number(e.target.value) : null } }))}
                aria-label={`Precio para ${conflicto.articulo}`}
              >
                <option value="">— No aplicar —</option>
                {conflicto.precios.map((precio) => <option key={precio} value={precio}>{dinero(precio)}</option>)}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

// ---------- Ya no están ----------
const YaNoEstan = ({ analisis, decisiones, cambiar }: Props) => {
  const marcados = new Set(decisiones.noDisponibles);
  return (
    <section>
      {analisis.yaNoEstanSospechoso ? (
        <p className="rl-aviso rl-aviso--error">
          Faltan muchos productos de golpe: puede ser una lista parcial y no productos discontinuados. Por eso vienen sin tildar.
          Revisá antes de marcar alguno.
        </p>
      ) : (
        <p className="rl-ayuda">
          Productos con código que no aparecen en esta lista (el CRM lista solo lo que está en venta). Tildados se marcan como «sin
          stock» en el sitio; no se borran.
        </p>
      )}
      <table className="rl-tabla">
        <thead><tr><th>Marcar no disponible</th><th>Producto</th><th>Código</th></tr></thead>
        <tbody>
          {analisis.yaNoEstan.map((producto) => (
            <tr key={producto.productoId}>
              <td>
                <input
                  type="checkbox"
                  checked={marcados.has(producto.productoId)}
                  onChange={() =>
                    cambiar((previas) => ({
                      ...previas,
                      noDisponibles: marcados.has(producto.productoId)
                        ? previas.noDisponibles.filter((id) => id !== producto.productoId)
                        : [...previas.noDisponibles, producto.productoId],
                    }))
                  }
                  aria-label={`Marcar ${producto.nombre} como no disponible`}
                />
              </td>
              <td>{producto.nombre}</td>
              <td>{producto.codigo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

// ---------- Ignorados ----------
const Ignoradas = ({ analisis }: { analisis: Analisis }) => (
  <section>
    <p className="rl-ayuda">
      Se saltearon porque están en «Códigos ignorados» o tienen precio en cero. Para sumar o quitar códigos: Administración → Códigos
      ignorados.
    </p>
    <table className="rl-tabla">
      <thead><tr><th>Código</th><th>Artículo</th><th>Precio</th><th>Motivo</th></tr></thead>
      <tbody>
        {analisis.ignoradas.map((fila) => (
          <tr key={fila.codigo}><td>{fila.codigo}</td><td>{fila.articulo}</td><td>{dinero(fila.precio)}</td><td>{fila.motivo}</td></tr>
        ))}
      </tbody>
    </table>
  </section>
);
