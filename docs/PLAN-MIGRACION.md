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

## Publicado

El 2026-11-19 se publicó `dist/` en ceromarket.com.uy con `hosting_deploy`
(estático). Reemplazó todo `public_html`: el frontend React viejo y la
instalación de WordPress que quedaba en `public_html/api/`.

- Antes de publicar se revisó `api/wp-content`: no había backups de base
  (`wc-imports`, `wp-file-manager-pro/fm_backup` y `woocommerce_uploads`
  estaban vacíos) y las fotos ya estaban en `recovered/media/`.
- Se conservó `dry28d3bhk7auzzjjp0kt52yyg84sz.html` (en `public/`): es un
  archivo de verificación de dominio, probablemente de Meta.
- Verificado en producción: las 11 rutas principales responden 200, una
  ruta inexistente da la página 404, `/productos` redirige a
  `/productos/`, los archivos de `/_astro/` salen con caché de un año y no
  hay imágenes rotas.

## Panel (2026-11-20)

El contenido ya no se edita con Keystatic: pasó a un panel Payload en
https://admin.ceromarket.com.uy (carpeta `admin/`, ver su README). La
migración de contenido inicial cargó ahí los 100 productos, 9 categorías,
11 posts (en borrador), las fotos y los datos del local. El sitio lee todo de
la API del panel al compilar; los archivos que antes estaban en
`src/content`, `src/data` y `src/assets/{productos,posts}` quedaron en
`admin/semilla/` como fuente de esa carga inicial.

Se verificó que el sitio compilado desde el panel es idéntico al publicado
desde los archivos (texto, enlaces y textos alternativos de 7 páginas, 119
páginas, 100 productos en `/catalogo.json`).

## Lista de precios, granel y catálogo completo (2026-11-20)

- **Panel con la marca** (menta, pizarra, Bricolage, logo y favicon).
- **Productos**: código del CRM, venta (empaquetado o a granel, por kilo o por
  litro), publicado.
- **Granel en la web**: ficha con cantidades rápidas, campo libre, pasos de 50
  y precio en vivo; tarjetas con cantidades rápidas; pedido y mensaje de
  WhatsApp con gramos y total estimado.
- **Importador del PDF «Listas de precios»** del CRM (ver `admin/README.md`):
  lectura por posición (la extracción de texto simple desfasa las columnas y
  da precios en el producto equivocado), análisis, pantalla de revisión y
  aplicación en segundo plano. Probado con el PDF real de septiembre de 2026:
  1.077 filas → 1.056 útiles, 2 conflictos de precio, 5 ignoradas (envases y
  una prueba); 965 productos nuevos y 91 de la web vinculados; el flujo
  mensual (misma lista otra vez, cambio de precio, producto que desaparece);
  y el build standalone de producción.
- **Catálogo de ~1.100 productos** en el sitio (buscador por palabras,
  `content-visibility`, 90 KB comprimido, 1.087 páginas en ~1 minuto).
- Publicar desde el panel usa el workflow «Publicar» (permiso Actions).

Pendiente de la carga real (hacerla en el panel de producción):
- Subir el PDF, **vincular a mano los ~50 productos de la web que no se
  emparejan solos** y revisar categorías y granel de los nuevos.
- ~950 productos nuevos salen **sin foto y sin descripción** (se publican con
  nombre y precio); queda hacer la imagen de relleno.

## Falta

1. Resolver la lista de arriba (fotos, posts, logo en SVG).
2. **Forzar HTTPS**: hoy `http://ceromarket.com.uy` responde 200 sin
   redirigir. Activar "Forzar HTTPS" en la sección SSL del sitio en hPanel. No se
   hizo en `.htaccess` porque el sitio está detrás del CDN de Hostinger y
   una regla con `%{HTTPS}` puede entrar en bucle.
3. **`GITHUB_TOKEN_PUBLICAR`** en el panel, para que guardar republique el
   sitio (ver `admin/README.md`).
4. Imagen de relleno para los productos sin foto.
5. Estadísticas de Search Console y Analytics en el panel (fase siguiente).
