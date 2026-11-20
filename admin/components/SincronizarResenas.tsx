"use client";
// Botón de la lista de reseñas: trae de Google Maps el puntaje y las
// reseñas más relevantes (ver lib/googleResenas.ts).
import { useState } from "react";
import type { ResultadoDeSincronizacion } from "../lib/googleResenas";

type Aviso = { tipo: "ok" | "error"; texto: string };

const describir = (resultado: ResultadoDeSincronizacion): string => {
  const partes = [
    resultado.nuevas ? `${resultado.nuevas} nueva${resultado.nuevas === 1 ? "" : "s"}` : null,
    resultado.actualizadas ? `${resultado.actualizadas} actualizada${resultado.actualizadas === 1 ? "" : "s"}` : null,
  ].filter(Boolean);
  const detalle = partes.length > 0 ? partes.join(" y ") : "sin reseñas nuevas";
  const sinTexto = resultado.sinTexto > 0 ? ` (${resultado.sinTexto} sin texto, que no se muestran)` : "";
  const puntaje = resultado.puntaje != null ? ` Puntaje: ${resultado.puntaje} con ${resultado.total ?? "?"} reseñas.` : "";
  return `Listo: ${detalle}${sinTexto}.${puntaje}`;
};

export const SincronizarResenas = () => {
  const [trabajando, setTrabajando] = useState(false);
  const [aviso, setAviso] = useState<Aviso | null>(null);

  const sincronizar = async () => {
    setTrabajando(true);
    setAviso(null);
    try {
      const respuesta = await fetch("/api/resenas/sincronizar", { method: "POST", credentials: "include" });
      const json = (await respuesta.json()) as ResultadoDeSincronizacion & { error?: string };
      if (!respuesta.ok) {
        setAviso({ tipo: "error", texto: json.error ?? "No se pudo sincronizar." });
        return;
      }
      setAviso({ tipo: "ok", texto: describir(json) });
      setTimeout(() => window.location.reload(), 1800);
    } catch {
      setAviso({ tipo: "error", texto: "No se pudo conectar con el panel." });
    } finally {
      setTrabajando(false);
    }
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <p style={{ marginBottom: "0.75rem", maxWidth: "62ch" }}>
        Google entrega las 5 reseñas más relevantes y el puntaje del local. Las que ya estaban se actualizan; no se borra nada.
      </p>
      <button type="button" className="btn btn--style-primary btn--size-medium" onClick={sincronizar} disabled={trabajando}>
        {trabajando ? "Sincronizando…" : "Sincronizar con Google"}
      </button>
      {aviso && (
        <p role="status" style={{ marginTop: "0.75rem", fontWeight: 600, color: aviso.tipo === "error" ? "var(--theme-error-500)" : "var(--theme-success-600)" }}>
          {aviso.texto}
        </p>
      )}
    </div>
  );
};
