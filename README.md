# CeroMarket

Repositorio del proyecto **CeroMarket** de ColoniaCloud.

Frontend en React + Vite (Apollo Client + WPGraphQL) que consume un
WordPress + WooCommerce headless en `api.ceromarket.com.uy`. La "compra"
se resuelve por WhatsApp, no hay checkout propio.

## Estado

Código reconstruido el 2026-08-20 a partir del build en producción, tras
la pérdida de acceso al repositorio de GitHub original. Ver
[`docs/RECONSTRUCCION.md`](docs/RECONSTRUCCION.md) para el detalle de qué
se recuperó tal cual y qué es una reescritura aproximada, y
[`docs/backend-wordpress.md`](docs/backend-wordpress.md) para el
inventario del backend.

## Puesta en marcha

```bash
npm install
cp .env.example .env
npm run dev
```

## Convenciones

- Rama principal: `main`
- Autoría de commits: `ColoniaCloud`

La identidad está fijada a nivel de repositorio, de modo que anula la
configuración global de git de la máquina:

```bash
git config user.name  "ColoniaCloud"
git config user.email "286984896+ColoniaCloud@users.noreply.github.com"
```
