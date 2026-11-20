# CeroMarket

Sitio de **CERO Market**, supermercado a granel en Pocitos, Montevideo.
Repositorio de ColoniaCloud.

Es un sitio 100% estático hecho con [Astro](https://astro.build). El
catálogo y las notas se editan con [Keystatic](https://keystatic.com), un
panel que escribe archivos dentro de este mismo repo: no hay base de datos
ni servidor. Las consultas y los pedidos se resuelven por WhatsApp; no hay
carrito ni checkout.

## Puesta en marcha

Requiere Node 22 o superior.

```bash
npm install
npm run dev        # sitio en http://localhost:4321 y panel en /keystatic
```

| Comando           | Qué hace                                                    |
| ----------------- | ----------------------------------------------------------- |
| `npm run dev`     | Desarrollo, con el panel de Keystatic y los borradores.     |
| `npm run check`   | Revisa tipos y plantillas (`astro check`).                  |
| `npm run build`   | Genera el sitio en `dist/` (sin panel y sin borradores).    |
| `npm run preview` | Sirve `dist/` para revisarlo antes de publicar.             |

## Cómo se edita el contenido

1. `npm run dev` y abrir `http://localhost:4321/keystatic`.
2. **Productos**, **Notas y recetas** y **Datos del local** (WhatsApp,
   dirección, horario, redes, texto de envíos).
3. Keystatic guarda en `src/content/` y `src/data/`, y las fotos en
   `src/assets/`. Esos cambios se commitean como cualquier otro archivo.

Los posts nacen como **borrador**: se ven en desarrollo y no salen en el
build hasta destildar la casilla. Blog y Recetas aparecen en el menú solo
cuando hay algo publicado.

Si un dato no cumple el esquema (por ejemplo, un WhatsApp con espacios o
una categoría inexistente), el build falla con el error en vez de publicar
algo roto. Los esquemas están en `keystatic.config.ts` (panel) y en
`src/content.config.ts` (sitio), y tienen que coincidir.

## Estructura

```
src/
  content/        productos (YAML) y posts (Markdoc), editados desde Keystatic
  data/           datos del local (ajustes.json)
  assets/         fotos de productos, posts y del local (Astro las optimiza)
  lib/            categorías, consultas al contenido y helpers
  layouts/        Base.astro: <head>, cabecera y pie
  components/     cabecera, pie, tarjetas, catálogo, formulario de WhatsApp
  pages/          una página por URL (se mantienen las del sitio viejo)
  scripts/        JavaScript del navegador (GSAP), uno por página
  styles/         global.css: tokens de diseño y componentes base
public/           favicon, robots.txt y .htaccess para el hosting
scripts/migracion importación del catálogo recuperado (ya corrida)
recovered/        respaldo de lo recuperado del sitio anterior (no se publica)
docs/             notas de la recuperación y de la migración
```

## Pedidos por WhatsApp

No hay checkout ni pagos en la web. El cliente agrega productos (botón
"Agregar" en las tarjetas y en la ficha) y en `/pedido` completa nombre,
retiro o envío, dirección y notas. Al enviar, se abre WhatsApp en su
teléfono con el pedido armado hacia el número del local: el mensaje sale
desde el número del cliente.

- El pedido se guarda solo en el navegador del cliente (`localStorage`); no
  pasa por ningún servidor. Lógica en `src/lib/pedido.ts`, pantallas en
  `src/scripts/pedido-global.ts` y `src/scripts/pedido.ts`.
- `/catalogo.json` se genera en cada build con nombre, presentación, precio
  y miniatura de cada producto. El pedido guardado tiene solo ids y
  cantidades, así que un cambio de precio llega solo.
- Si todos los productos tienen precio, el mensaje lleva el total; si no,
  pide confirmar precios.

## Diseño y movimiento

- Paleta y tipografía salen del local: pared menta, laminado blanco,
  pizarras de precio. Tokens en `src/styles/global.css`.
- La menta no se usa nunca como color de texto sobre blanco (contraste
  1.91:1): solo como superficie.
- Todo funciona sin JavaScript. Los scripts suman: filtro y buscador del
  catálogo con animación FLIP, entrada de la portada y fotos que cambian
  con el scroll en Misión. Con "reducir movimiento" activado no se anima.
- Entre páginas se usan View Transitions nativas: la foto de un producto
  viaja de la grilla a su ficha.

## Publicar

Es automático: cada push a `main` publica el sitio en
https://ceromarket.com.uy en un par de minutos.

1. GitHub Actions ([`.github/workflows/publicar.yml`](.github/workflows/publicar.yml))
   corre `npm run check` y `npm run build`.
2. Si todo pasa, deja `dist/` en la rama `produccion`, que se reescribe
   entera en cada publicación. No se edita a mano.
3. Hostinger está conectado a la rama `produccion` (por la integración con
   GitHub de hPanel) y la publica en cuanto cambia.

Si el check o el build fallan, no se publica nada y el sitio queda como
estaba; el error se ve en la pestaña Actions del repo. Para volver a
publicar sin cambios, se puede correr el workflow a mano desde esa pestaña.

## Historia

El sitio anterior era un frontend React sobre un WordPress + WooCommerce
que dejó de existir. Cómo se recuperaron el código, el catálogo y las
fotos está en [`docs/RECONSTRUCCION.md`](docs/RECONSTRUCCION.md) y
[`docs/RECUPERACION-CATALOGO.md`](docs/RECUPERACION-CATALOGO.md).

## Convenciones

- Rama principal: `main`
- Autoría de commits: `ColoniaCloud`

La identidad está fijada a nivel de repositorio, de modo que anula la
configuración global de git de la máquina:

```bash
git config user.name  "ColoniaCloud"
git config user.email "286984896+ColoniaCloud@users.noreply.github.com"
```
