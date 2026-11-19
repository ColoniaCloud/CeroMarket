# Backend: WordPress headless en api.ceromarket.com.uy

El backend **no tiene código a medida que recuperar**: es un WordPress
estándar con plugins públicos, usado únicamente como fuente de datos vía
WPGraphQL. Toda la lógica de negocio propia de CeroMarket vive en el
frontend (ver `../src`).

## Endpoint

```
https://api.ceromarket.com.uy/graphql
```

## Tema

- **Twenty Twenty-Five** v1.4 — tema por defecto de WordPress, sin
  personalizar. No aporta al frontend (es headless).

## Plugins relevantes instalados

| Plugin | Versión | Rol |
|---|---|---|
| WPGraphQL | 2.11.2 | Expone el schema GraphQL sobre contenido de WordPress |
| WP GraphQL WooCommerce (WooGraphQL) | 0.19.0 | Extiende el schema con tipos de producto de WooCommerce (`Product`, `SimpleProduct`, etc.) |
| WooCommerce | 10.6.2 | Catálogo de productos, categorías |
| LiteSpeed Cache | — | Cache / performance |
| Wordfence | — | Seguridad |
| Hostinger (varios: onboarding, AI assistant) | — | Plugins propios del panel de Hostinger, no relacionados con el negocio |
| WordPress Importer | — | Utilidad estándar de importación de contenido |

## Tipos de contenido consumidos por el frontend

- `products` / `product(id, idType: SLUG)` — WooCommerce, con 4 variantes
  de unión: `SimpleProduct`, `VariableProduct`, `ExternalProduct`,
  `GroupProduct`.
- `productCategories`
- `posts` / `post(id, idType: SLUG)` — entradas de blog estándar de
  WordPress.

Ninguna de las queries usadas por el frontend pide precio, stock ni datos
de checkout — la "compra" no ocurre en el sitio, se resuelve por WhatsApp
(ver `docs/RECONSTRUCCION.md`). Si en algún momento existió flujo de
carrito/checkout, no forma parte del build de producción analizado.

## Qué no se pudo revisar

`wp-config.php` está bloqueado por la API de Hostinger (contiene
credenciales), así que no se confirmó el nombre exacto de la base de datos
que usa este sitio vía archivo — la asociación se hizo por el campo
`domain` que Hostinger reporta para cada base y por ser la única base con
datos ligados a un sitio realmente servido en producción hoy. Ver el
informe principal para el detalle de bases de datos.
