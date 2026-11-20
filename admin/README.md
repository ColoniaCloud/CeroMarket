# Panel de CERO Market

[Payload](https://payloadcms.com) 3 sobre Next.js 16, con SQLite. Publicado en
https://admin.ceromarket.com.uy. Es donde se editan productos, categorías,
notas y recetas, fotos y los datos del local, y donde se carga la lista de
precios mensual del CRM. El sitio (https://ceromarket.com.uy, en la raíz del
repo) lee todo esto de la API del panel cada vez que se compila.

## En local

```bash
cd admin
npm install
npm run payload migrate     # crea la base en admin/data/
npm run semilla             # carga el contenido inicial (base vacía)
npm run dev                 # http://localhost:3100/admin
```

La primera pantalla pide crear un usuario. `admin/data/` no se sube al repo.
Las migraciones son la única fuente de verdad del esquema (el modo
desarrollo no empuja cambios solo): ver «Cambiar las colecciones».

Para ver el sitio con este panel local, desde la raíz del repo:
`PAYLOAD_URL=http://localhost:3100 npm run dev`.

## Qué hay

| Grupo           | Qué se edita                                                                      |
| --------------- | --------------------------------------------------------------------------------- |
| Catálogo        | Productos, categorías y **listas de precios** (el PDF mensual del CRM).           |
| Contenido       | Notas y recetas (con borradores), **reseñas** de Google y la biblioteca de fotos.  |
| Administración  | Usuarios, «Datos del local» (WhatsApp de pedidos, etc.) y «Códigos ignorados».    |

- `collections/` y `globals/`: los esquemas, en español.
- `lib/datos.ts`: dónde viven la base, las fotos y la clave de sesiones.
- `lib/publicar.ts`: al guardar, pide a GitHub que republique el sitio.
- `lib/lista/`: la importación de la lista de precios (abajo).
- `lib/semilla.ts`, `scripts/semilla.ts` y `semilla/`: la carga inicial del
  contenido, para una base vacía (en producción ya corrió el 2026-11-20).
- `components/`: logo, ícono y la pantalla de revisión de listas. La marca
  (colores, tipografía) está en `app/(payload)/custom.css`.

La API es de solo lectura sin sesión: productos **publicados**, categorías,
fotos y datos del local son públicos; las notas en borrador, los usuarios, las
listas de precios y los códigos ignorados no.

## Reseñas de Google Maps

Contenido → Reseñas. Son las que se muestran antes del pie de todas las
páginas, junto con el puntaje y el total de «Datos del local → Google Maps y
reseñas» (hoy 4,8 con 123, al 2026-11-20). Dos formas de cargarlas, que se
pueden combinar:

- **A mano:** autor, estrellas, texto y, si se quiere, el enlace a la reseña.
  «Mostrar en el sitio» destildado la oculta.
- **Sincronizar con Google** (botón arriba de la lista): trae el puntaje, el
  total y las 5 reseñas más relevantes con la API oficial de Google (Places
  API, versión nueva). Las que ya estaban se actualizan y las nuevas se
  agregan; no se borra nada y lo que se ocultó queda oculto. Hace falta la
  variable `GOOGLE_PLACES_API_KEY` (abajo). Sin la clave el botón avisa y el
  resto del panel funciona igual. Google entrega solo 5 reseñas por pedido:
  con el tiempo se juntan más.

Código: `collections/Resenas.ts`, `lib/googleResenas.ts` (la llamada a Google
se probó con una respuesta simulada, no con una clave real) y
`components/SincronizarResenas.tsx` (el botón). El mapa del pie sale de
«Mapa para el pie del sitio» (la dirección que da Google Maps en Compartir →
Incorporar un mapa); vacío, se busca el local por su dirección.

## Productos

Además de lo básico, cada producto tiene:

- **Código del CRM** (único): con él la lista mensual actualiza el precio.
- **Venta**: *empaquetado* (por unidad) o *a granel*. A granel el precio es por
  **kilo** o por **litro** («El precio es por») y en el sitio el cliente elige
  cuánto quiere (de a 50 g o ml).
- **Publicado**: destildado, el producto no aparece en el sitio.
- **Disponible**: destildado, se ve «sin stock» y no se puede agregar al pedido.

## Lista de precios mensual

Catálogo → Listas de precios → Crear nuevo, y subir el PDF «Listas de precios»
del CRM (columnas Código, Artículo, Marca y Contado, en pesos).

1. **Lectura** (`lib/lista/leerPdf.ts`): usa la posición de cada texto en la
   página. Leer el texto «de corrido» da precios en el producto equivocado
   cuando una marca está vacía. Rechaza el archivo si no reconoce las columnas
   o la moneda, en lugar de adivinar.
2. **Análisis** (`analizar.ts`): compara con el catálogo y guarda el resultado
   en la lista; todavía no cambia nada.
3. **Revisión** (`components/RevisionDeLista.tsx`), con pestañas:
   - *Vincular*: productos de la web sin código. Se elige a qué artículo
     corresponde cada uno (`emparejar.ts` sugiere; las coincidencias seguras
     vienen elegidas). El botón de sugerencias solo acepta las de 80% o más.
   - *Precios*: cambios de precio. Los de más del 30% vienen sin tildar.
   - *Productos nuevos*: artículos que no están en la web. Se crean
     **publicados** con el precio de la lista; nombre, categoría y venta
     (granel o no) son editables. Lo que se destilda no se crea y queda en
     «Códigos ignorados» para que no vuelva a aparecer.
   - *Conflictos*: un código repetido con precios distintos; se elige cuál.
   - *Ya no están*: productos con código que no aparecen en la lista; se
     marcan «no disponibles» (no se borran). Si faltan más del 25% de golpe,
     se asume una lista parcial y vienen sin tildar.
   - *Ignorados*: lo que se salteó (envases, pruebas, precio en cero).
4. **Aplicar** (`aplicar.ts`): corre en segundo plano (la primera lista crea
   más de mil productos), se puede cerrar la página y se puede volver a
   aplicar sin duplicar nada. Al terminar pide **una** republicación del sitio.

Las reglas que arman un producto a partir de un artículo del CRM (nombre
legible, presentación, categoría, granel o no) están en `lib/lista/reglas.ts`.
Son heurísticas: aciertan en la mayoría y lo dudoso se revisa en pantalla. Si
una categoría se clasifica mal seguido, se ajusta ahí.

Si el CRM cambia el formato del PDF, `leerPdf.ts` rechaza el archivo con un
mensaje claro; ahí se ajusta la lectura.

## Publicación en Hostinger

- Sitio `admin.ceromarket.com.uy` (app Node.js, Next.js, Node 22), conectado
  a GitHub: rama `main`, carpeta `admin/`. Cada push a `main` lo vuelve a
  compilar (unos 2 minutos). El build corre `payload migrate` antes de
  `next build`.
- Variables de entorno (hPanel → el sitio → Node.js → Variables):
  - `PAYLOAD_DATA_DIR` = `/home/u442660975/domains/admin.ceromarket.com.uy/datos-payload`.
    **Tiene que quedar fuera de la app**: Hostinger reemplaza la carpeta de la
    app en cada deploy. Ahí están `payload.sqlite`, `medios/` (las fotos),
    `listas/` (los PDF) y `.secreto`. Entra en los backups diarios de Hostinger.
  - `GITHUB_TOKEN_PUBLICAR`: token fine-grained de GitHub, solo para el repo
    `ColoniaCloud/CeroMarket`, con permiso **Actions: Read and write** (no hace
    falta ningún permiso sobre el código). Con él, el panel dispara el
    workflow «Publicar» al guardar. Sin él, el panel funciona igual pero
    guardar no republica el sitio (queda un aviso en los logs). Se carga a
    mano en hPanel; no va en el repo.
  - `GOOGLE_PLACES_API_KEY` (opcional): clave de Google Cloud con
    **Places API (New)** habilitada, para «Sincronizar con Google». Conviene
    restringirla a esa API. Se carga a mano en hPanel; no va en el repo. La
    API tiene un cupo mensual gratis; el botón hace un solo pedido por vez.
  - `PAYLOAD_SECRET` es opcional: si no está, el panel genera la clave la
    primera vez y la guarda en `PAYLOAD_DATA_DIR/.secreto`.
- Los logs de arranque muestran `[datos] PAYLOAD_DATA_DIR -> …`: es la forma
  de verificar la ruta, porque hPanel enmascara los valores.
- `pdfjs-dist` (lee el PDF) se carga desde `node_modules`
  (`serverExternalPackages`) y su archivo de trabajo se importa en
  `lib/lista/leerPdf.ts` para que el build standalone lo incluya. Se probó
  compilando en modo standalone y subiendo el PDF real.

## Cambiar las colecciones

Cada cambio de esquema necesita una migración, o la base de producción no
lo recibe:

```bash
cd admin
npm run payload migrate:create descripcion_del_cambio
npm run payload migrate
```

Eso genera el archivo en `migrations/` y lo agrega a `migrations/index.ts`.
Se commitea junto con el cambio; el build de Hostinger la aplica. Después,
`npm run tipos` actualiza `payload-types.ts` y, si se agregó un componente
al panel, `npm run payload generate:importmap`. Si el cambio afecta lo que lee
el sitio, actualizar también `src/content.config.ts` en la raíz.

Las migraciones son **solo de esquema**: el contenido inicial no es una
migración porque usa el esquema actual y fallaría en una base nueva (ver
`scripts/semilla.ts`).
