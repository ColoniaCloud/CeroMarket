# Recuperación del catálogo y la media (2026-11-18)

Segunda recuperación del proyecto. La primera (ver
[`RECONSTRUCCION.md`](RECONSTRUCCION.md)) rescató el **código** del frontend
desde el bundle de producción. Esta rescata el **contenido**: productos,
posts e imágenes.

## Qué pasó

El subdominio `api.ceromarket.com.uy` dejó de existir y con él el acceso al
WordPress headless. Pero el WordPress **no estaba en un sitio aparte**:
vivía en la carpeta `api/` del mismo hosting de `ceromarket.com.uy`.

```
/home/<usuario-hostinger>/domains/ceromarket.com.uy/public_html/api/
```

Los archivos siguen ahí. Lo que se borró fue el vhost del subdominio y
**la base de datos**: `https://ceromarket.com.uy/api/` responde
"Database Error", y en la cuenta de Hostinger no hay ninguna base asignada
a este dominio (se revisaron las 29 existentes).

## Qué se recuperó

### Catálogo y blog: `recovered/catalog/`

La fuente es `llms.txt`, un inventario de contenido que el plugin
"Hostinger Tools" dejó escrito como archivo estático en la raíz del
WordPress. Al ser estático se sirve sin base de datos, así que sobrevivió
al borrado. Se descargó intacto (23.388 bytes) y se parseó con
`parse-llms.mjs`.

| Archivo | Contenido |
|---|---|
| `products.json` | **100 productos**: nombre, slug y URL original |
| `posts.json` | **11 posts** del blog con su bajada |
| `pages.json` | 4 páginas (carrito, checkout, mi cuenta, tienda — de WooCommerce, sin valor) |
| `llms.txt` | La fuente cruda, sin modificar |

De los 100 productos, **33 tienen descripción** y 6 de esas están truncadas
por WordPress (marcadas con `descriptionTruncated: true`). Los 67 restantes
tienen nombre y slug solamente.

### Imágenes: `recovered/media/`

Las imágenes se siguen sirviendo por HTTP desde el WordPress caído, porque
Apache las entrega sin pasar por PHP.

| | |
|---|---|
| Descargadas | **532 archivos originales**, 47 MB |
| `media/2025/08/` | 519 (fotos de producto y marca) |
| `media/2023/03/`, `media/2023/05/` | 13 (imágenes de los posts) |
| Verificación | 532/532 son imágenes válidas, 0 vacíos, 0 páginas de error |

Se bajaron **solo los originales**, no los recortes que genera WordPress
(`-150x150`, `-300x300`, `-768x768`, etc.): el sitio nuevo regenera los
tamaños en build, mejor y en formatos modernos. El inventario completo del
directorio quedó en `media-inventario-2025-08.txt` (2.650 nombres) y la
lista de originales en `media-originales-*.txt`.

## Qué NO se recuperó

- **Precios y stock.** Nunca estuvieron en el frontend tampoco: ninguna de
  las 7 queries GraphQL los pedía.
- **La relación producto ↔ imagen.** Esto es lo más caro de la pérdida. Los
  nombres de archivo son GUIDs (`4A64EB80-2A49-4696-B80F-579DA952E37E.jpg`),
  y el vínculo con cada producto vivía en la base. Hay que rearmarlo a ojo.
  Unos pocos archivos tienen nombre descriptivo (`shitake`, `brotta`,
  `semillas`, `arandanos-chocolate`, `couscous`, `cuatro-pimientas`,
  `COMINO-MOLIDO`) y esos sí se pueden matchear directo.
- **Las categorías de cada producto.** Existía `productCategories`, pero el
  inventario no las lista.
- **El cuerpo completo de los posts.** Solo quedó la bajada de cada uno.
- **El texto completo de 67 productos.**

### Vías que se probaron y no dieron nada

- Backups de plugin, dumps `.sql`, `wp-content/uploads/wc-imports/`
  (vacío) y el cache de LiteSpeed (vacío).
- Wayback Machine: no tiene nada archivado de `api.ceromarket.com.uy`.
- Listado de directorio por HTTP: devuelve 403.

**Queda una vía sin agotar, y es la mejor:** los backups automáticos de
Hostinger, en hPanel → Backups. La API pública no los expone, así que hay
que mirarlos a mano. Si hay un dump de la base de los últimos meses, se
recupera todo lo de la lista anterior.

## Notas de método

- Los nombres de archivo salieron de paginar el listado del directorio
  (`2.657` entradas). Con 11 ventanas solapadas se enumeraron 2.650 nombres
  distintos: el orden que devuelve la API no es estable, así que 7 entradas
  nunca aparecieron. Los 519 originales fueron idénticos en las 11 ventanas.
- El WordPress viejo **se dejó intacto** en el servidor. Sirve de respaldo
  de la media hasta que el sitio nuevo esté publicado. No borrarlo antes.
- `recovered/media/` son 47 MB y hoy **no** está en `.gitignore`.
