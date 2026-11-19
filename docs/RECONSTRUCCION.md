# Reconstrucción del proyecto CeroMarket

Este repositorio se reconstruyó el 2026-08-20 después de perder el acceso
al repositorio de GitHub original. No hubo acceso al código fuente
original en ningún momento: todo lo que hay acá salió de analizar lo que
estaba realmente desplegado en Hostinger (`ceromarket.com.uy` y
`api.ceromarket.com.uy`).

## Qué se pudo recuperar y cómo

El frontend en producción es un **build de Vite ya minificado**
(`assets/index-eb42d4ee.js` + `.css`, sin source maps). A partir de ahí:

1. Se descargó el bundle público y se formateó con Prettier
   (`recovered/index-eb42d4ee.pretty.js`) para poder leerlo.
2. Los **textos, clases de Tailwind, rutas, y las 7 queries GraphQL**
   sobreviven intactos a la minificación (un minificador no puede tocar
   strings ni nombres de campos GraphQL sin romper la app). Eso es lo que
   se usó para reescribir cada página en `src/pages/`.
3. Lo que **no sobrevive** a la minificación son los nombres originales de
   variables, componentes e imports — quedan como `w`, `C`, `ny`, `ia`,
   etc. Por eso el código en `src/` es una **reescritura fiel en
   comportamiento y contenido**, no una recuperación byte-a-byte del
   repositorio original. Los nombres de archivo/componente, la
   organización en carpetas y los nombres de variables son decisiones
   nuevas, no las originales.

## Nivel de confianza por pieza

| Recuperado | Confianza | Nota |
|---|---|---|
| Las 10 rutas (`src/App.jsx`) | Exacta | Tomadas literal del router compilado |
| Las 7 queries GraphQL (`src/graphql/`) | Exacta | Texto literal, incluidas en el bundle sin alterar |
| Endpoint de Apollo Client | Exacta | `https://api.ceromarket.com.uy/graphql`, confirmado en la instanciación real de `ApolloClient` |
| Copys / textos en español | Exacta | Strings literales del bundle |
| Clases de Tailwind | Exacta | Literales del bundle; el CSS generado por el scaffold pesa 29.17KB contra 30.65KB del original |
| Colores de marca (`primary` #79CABD, `dark` #222426) | Exacta | Extraídos del CSS compilado en producción |
| Stack (React + React Router v6 + Apollo Client + Swiper + Tailwind) | Alta | Inferido de firmas de código inequívocas (`queryManager`, `fragmentRegistry`, `v7_fetcherPersist`, patrón `Swiper`/`SwiperSlide`) |
| Nombres de íconos de `react-icons` | Aproximada | Los imports se pierden en la minificación; se eligieron equivalentes semánticos razonables (ver comentario en `Header.jsx`) |
| Organización de archivos/componentes | Nueva | El original pudo haber estado organizado distinto; esto es una estructura convencional de proyecto Vite+React |

## Lo que NO se pudo reconstruir

- Historial de commits, ramas, o cualquier código que no llegó a
  producción (features en desarrollo, código muerto, versiones previas).
- El backend no tiene nada propio que reconstruir: es WordPress +
  WooCommerce + WPGraphQL estándar sin personalizar (ver
  `docs/backend-wordpress.md`).
- Cualquier lógica de servidor si existiera fuera de WordPress (no se
  encontró evidencia de que exista).

## Referencia cruda

`recovered/build/` contiene una copia exacta, sin modificar, de lo que
está sirviendo hoy `ceromarket.com.uy` (`index.html`, `assets/*.js`,
`assets/*.css`). Sirve como respaldo redesplegable tal cual si hiciera
falta, y como fuente de verdad para verificar cualquier duda sobre el
comportamiento real contra lo reescrito en `src/`.

## Cómo correr esto

```bash
npm install
cp .env.example .env
npm run dev
```
