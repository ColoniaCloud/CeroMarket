# Migración a Astro + Keystatic — estado y lo que falta

Última actualización: 2026-11-19.

## Hecho

- App React reconstruida movida (no borrada) a `recovered/react-reconstruido/`.
- Instalado: Astro 7.4, Keystatic 0.6 (+ `@keystatic/astro` 6), Tailwind 4.3,
  GSAP 3.15, React 19 (solo para el panel), Markdoc, Sharp, sitemap.
- `astro.config.mjs`: Keystatic se carga **solo en `astro dev`**; `build` y
  `preview` son 100% estáticos.
- Esquemas: `keystatic.config.ts` (panel) y `src/content.config.ts` (Astro,
  Zod 4 desde `astro/zod`). Categorías en `src/lib/categorias.ts`. Datos del
  local en `src/data/ajustes.json`, validados en `src/lib/ajustes.ts`.
- Contenido importado con `scripts/migracion/importar-catalogo.mjs`:
  100 productos (81 con foto, 8 destacados), 11 posts (todos borrador, con
  portada), 15 imágenes del sitio en `src/assets/sitio/`.
- Asignación de fotos: `scripts/migracion/imagenes.json`, hecha mirando
  hojas de contacto (`scripts/migracion/hojas-de-contacto.mjs`).
- **Sitio completo** (118 páginas, `astro check` y `astro build` sin errores
  ni advertencias):
  - Layout base con SEO (canónica, Open Graph, sitemap, robots), cabecera
    fija con menú móvil por Popover API (sin JS) y pie.
  - Páginas con las URLs viejas: `/`, `/productos/` y
    `/productos/[categoria]/` (nueva), `/producto/[slug]/`, `/blog/`,
    `/blog/[slug]/`, `/recetas/`, `/sobre-nosotros/`, `/mision-zero-waste/`,
    `/contacto/`, `/trabaja-con-nosotros/` y `404`.
  - Catálogo: filtro por categoría y buscador sin tildes, en el lugar, con
    GSAP Flip; sin JS los filtros son enlaces. Si no hay resultados, ofrece
    preguntar por WhatsApp con lo buscado.
  - Ficha de producto con consulta por WhatsApp prearmada, datos de retiro y
    envíos, relacionados de la misma categoría y datos estructurados.
  - Portada con entrada orquestada (SplitText + clip-path); Misión con fotos
    que se descubren al hacer scroll (ScrollTrigger, solo escritorio).
  - Formularios de contacto y trabajo que arman un mensaje de WhatsApp (sin
    JS igual mandan el mensaje).
  - View Transitions nativas: la foto viaja de la grilla a la ficha.
  - Datos estructurados `GroceryStore` en la portada y `Product` en cada
    ficha.
- Revisado en el navegador, escritorio (1440) y móvil (375): portada,
  catálogo (filtro, buscador, botón Atrás), ficha, Misión, contacto
  (mensaje armado), menú móvil (Esc cierra y devuelve el foco), panel
  `/keystatic` y borradores visibles solo en desarrollo. Sin desborde
  horizontal en móvil.

## Para revisar a mano

- **19 productos sin foto** (casi todas especias molidas, indistinguibles en
  foto): comino molido, anís estrellado molido, herbes de provence, fenogreco,
  garam masala, lecitina de soja, harina de espelta, cardamomo molido, bolitas
  de arroz, limpiador facial Linduras, sérum Sabia, granola chocolate, boldo,
  gelatina sin sabor, fariña de mandioca, condimento tipo azafrán, roll-on
  Ambar, cilantro deshidratado, adobo. En el sitio muestran el nombre
  escrito a mano en lugar de la foto.
- **Asignaciones de confianza media**: chocolates 71%/96%/Belcolade (fotos
  de callets genéricas), cafés en grano (fotos genéricas de granos),
  Vitanna 100 g, cayena, condimento para guiso, galletas de avena, yerba
  suave, cepillo para ducha, bolsa marinera, arroz grano medio (es una ficha
  con texto).
- **Categorías inferidas** de los nombres (las originales se perdieron).
- **Sin precios**: se perdieron con la base. El campo existe en Keystatic;
  al cargarlo aparece en la etiqueta pizarra. Mientras tanto, el sitio
  invita a consultar por WhatsApp.
- **El catálogo real era más grande que 100**: hay fotos de productos que no
  figuran (miel Ecoapi, copa Evaluna, línea Brotta, aceite de coco Prana…).
  `llms.txt` probablemente tenía tope de 100. Un backup de base en hPanel
  los recuperaría.
- **Posts**: solo se recuperó la bajada, no el cuerpo. Algunas bajadas
  quedaron cortadas ("Ingredientes para 4 personas: Preparación:"). Hay que
  escribirlos o reescribirlos antes de destildar "Borrador".
- **Páginas legales**: el pie viejo enlazaba a Política de privacidad y
  Términos y condiciones, pero no hay texto recuperado. No se crearon ni se
  enlazan; si hacen falta, hay que redactarlas.
- **Crédito del pie viejo** ("Developed by" con enlace a wpuruguay.com): no
  se incluyó. Agregarlo si corresponde.
- Logos: solo hay PNG/WebP chicos (190×35). Se ven algo blandos en
  pantallas de alta densidad. Pedir el logo en SVG.

## No verificado

- Safari y Firefox. Las View Transitions entre páginas funcionan en
  Chrome, Edge y Safari 18.2+; en Firefox se navega normal, sin animación.
- Lectores de pantalla reales (se revisó estructura, etiquetas y foco).

## Falta

1. Resolver la lista de arriba (fotos, precios, posts, logo).
2. **Deploy, con cuidado**: `hosting_deploy` pisa todo el contenido del
   sitio, incluida la carpeta `public_html/api/`, que hoy es el único
   respaldo en servidor de las imágenes originales. Ya están bajadas en
   `recovered/media/`, pero confirmar antes de desplegar. Se publica el
   contenido de `dist/`, que incluye `.htaccess` (página 404 y caché de
   `/_astro/`).
