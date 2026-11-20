# CeroMarket

Sitio de **CERO Market**, supermercado a granel en Pocitos, Montevideo.
Repositorio de ColoniaCloud.

Dos partes en el mismo repo:

- **El sitio** (raíz del repo): 100% estático, hecho con
  [Astro](https://astro.build). Se publica en https://ceromarket.com.uy.
- **El panel** ([`admin/`](admin/)): [Payload](https://payloadcms.com) sobre
  Next.js, en https://admin.ceromarket.com.uy. Ahí se editan productos,
  precios, fotos, categorías, notas, recetas y los datos del local.

El sitio lee el contenido de la API del panel cada vez que se compila; el
sitio publicado no depende del panel para funcionar. Los pedidos se arman en
la web y se mandan por WhatsApp; no hay pagos en línea.

## Puesta en marcha

Requiere Node 22 o superior.

```bash
npm install
npm run dev        # sitio en http://localhost:4321, con el contenido del panel en línea
```

| Comando           | Qué hace                                                    |
| ----------------- | ----------------------------------------------------------- |
| `npm run dev`     | Sitio en desarrollo.                                        |
| `npm run check`   | Revisa tipos, plantillas y el contenido que llega del panel. |
| `npm run build`   | Genera el sitio en `dist/`.                                 |
| `npm run preview` | Sirve `dist/` para revisarlo antes de publicar.             |

Por defecto el sitio lee de https://admin.ceromarket.com.uy. Para probar
contra un panel local: `PAYLOAD_URL=http://localhost:3100 npm run dev`. El
panel tiene su propio README en [`admin/README.md`](admin/README.md).

## Cómo se edita el contenido

En https://admin.ceromarket.com.uy, con usuario y contraseña:

- **Catálogo:** productos (nombre, marca, presentación, categoría, precio,
  descripción, fotos, venta empaquetada o a granel, disponible, publicado,
  destacado, código del CRM), categorías (con su orden) y **listas de
  precios** (ver más abajo).
- **Contenido:** notas y recetas, con borradores, y la biblioteca de fotos.
- **Administración:** usuarios y "Datos del local" (WhatsApp de pedidos,
  dirección, horario, redes, texto de envíos).

Al guardar, el panel pide a GitHub que vuelva a compilar y publicar el
sitio: el cambio se ve en ceromarket.com.uy en unos 2 o 3 minutos. Para eso
el panel necesita la variable `GITHUB_TOKEN_PUBLICAR` (ver
[`admin/README.md`](admin/README.md)).

### Lista de precios mensual (PDF del CRM)

El precio de cada producto sale del PDF «Listas de precios» que genera el
CRM del local. Una vez por mes:

1. En el panel, **Catálogo → Listas de precios → Crear nuevo**, y subir el PDF.
2. Se lee y se compara con el catálogo, pero **no se cambia nada** todavía.
3. Se revisa: precios que cambian (los de más del 30% vienen sin tildar),
   productos nuevos (editables), conflictos de precio y productos que ya no
   están en la lista.
4. **Aplicar cambios.** El sitio se republica solo.

Cada producto queda atado a su **código del CRM**, así que el precio se
actualiza sin ambigüedad. La primera lista sirve además para vincular los
productos que ya estaban en la web con su código. Más detalle en
[`admin/README.md`](admin/README.md).

Las notas en borrador no llegan al sitio. Blog y Recetas aparecen en el
menú solo cuando hay algo publicado. Si un dato no cumple el esquema (por
ejemplo, un WhatsApp con espacios), el build falla y el sitio queda como
estaba: los esquemas están en `src/content.config.ts` y `src/lib/ajustes.ts`.

## Estructura

```
src/
  content.config.ts  cargadores: productos, categorías y notas desde el panel
  assets/sitio/      fotos del local y logos (las de productos vienen del panel)
  lib/               API del panel, datos del local, pedido y helpers
  layouts/           Base.astro: <head>, cabecera y pie
  components/        cabecera, pie, tarjetas, catálogo, formulario de WhatsApp
  pages/             una página por URL (se mantienen las del sitio viejo)
  scripts/           JavaScript del navegador (GSAP, pedido), uno por página
  styles/            global.css: tokens de diseño y componentes base
admin/               panel Payload (ver admin/README.md)
public/              favicon, robots.txt, .htaccess y verificación de dominio
scripts/migracion/   importación del catálogo recuperado (ya corrida)
recovered/           respaldo de lo recuperado del sitio anterior (no se publica)
docs/                notas de la recuperación y de la migración
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
- **Productos a granel** (`venta: granel`): el precio del producto es por
  kilo (o por litro) y el cliente elige cuánto quiere. En la ficha hay
  cantidades rápidas (100 g, 250 g, 500 g, 1 kg), un campo libre y los
  botones − / + de 50 en 50 (mínimo 50, máximo 20.000), y el precio se
  calcula en vivo. En las tarjetas, «Agregar» abre las cantidades rápidas.
  La cantidad se guarda en gramos (o ml) y el importe se redondea al peso.
  Como se pesa en el local, el mensaje avisa que el total es estimado.
  Lógica en `src/lib/granel.ts`.
- `/catalogo.json` se genera en cada build con nombre, presentación, precio
  y miniatura de cada producto. El pedido guardado tiene solo ids y
  cantidades, así que un cambio de precio llega solo.
- Si todos los productos tienen precio, el mensaje lleva el total (estimado
  si hay granel); si no, pide confirmar precios.
- El catálogo tiene más de mil productos: las tarjetas fuera de pantalla no
  se dibujan hasta que se acercan (`content-visibility`) y la página pesa
  unos 90 KB comprimida. El buscador pide todas las palabras, en cualquier
  orden y sin importar los acentos.

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

Es automático. El sitio se vuelve a compilar y publicar:

- con cada push a `main` que toque el sitio (los cambios que son solo de
  `admin/` no lo disparan);
- cuando el panel avisa que se guardó un cambio (evento `contenido`);
- a mano, desde la pestaña Actions del repo.

1. GitHub Actions ([`.github/workflows/publicar.yml`](.github/workflows/publicar.yml))
   corre `npm run check` y `npm run build`, que leen el contenido del panel.
2. Si todo pasa, deja `dist/` en la rama `produccion`, que se reescribe
   entera en cada publicación. No se edita a mano.
3. Hostinger está conectado a la rama `produccion` (integración con GitHub
   de hPanel) y la publica en cuanto cambia.

`https://ceromarket.com.uy/version.txt` dice qué commit está publicado. Si
el check o el build fallan (o el panel no responde), no se publica nada y el
sitio queda como estaba; el error se ve en la pestaña Actions.

El panel se publica aparte: Hostinger compila `admin/` con cada push a
`main` (ver [`admin/README.md`](admin/README.md)).

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
