import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_CATEGORIES, GET_ALL_PRODUCTS_FOR_GRID } from "../graphql/products";
import ProductCard from "../components/ProductCard";

function Products() {
  const [activeCategory, setActiveCategory] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [first, setFirst] = useState(12);

  const { data: catData, loading: catLoading, error: catError } = useQuery(GET_PRODUCT_CATEGORIES);
  const { data: prodData, loading: prodLoading, error: prodError } = useQuery(
    GET_ALL_PRODUCTS_FOR_GRID,
    { variables: { first } },
  );

  const categories = catData?.productCategories?.nodes || [];
  const products = prodData?.products?.nodes || [];

  const filtered = useMemo(
    () =>
      activeCategory
        ? products.filter((p) =>
            p.productCategories?.nodes?.some((c) => c.slug === activeCategory),
          )
        : products,
    [products, activeCategory],
  );

  const CategoryFilter = ({ inline = false }) => (
    <div className={inline ? "" : "p-4"}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold">Categorías</h3>
        {!inline && (
          <button onClick={() => setMobileFiltersOpen(false)} className="text-sm opacity-70">
            Cerrar
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="radio"
            name="category"
            value=""
            checked={activeCategory === ""}
            onChange={() => setActiveCategory("")}
            className="form-radio h-4 w-4 accent-primary"
          />
          <span className="transition-font group-hover:font-extrabold">Todos</span>
        </label>
        {categories.map((c) => (
          <label key={c.id} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="category"
              value={c.slug}
              checked={activeCategory === c.slug}
              onChange={() => setActiveCategory(c.slug)}
              className="form-radio h-4 w-4 accent-primary"
            />
            <span className="transition-font group-hover:font-extrabold">{c.name}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold">Nuestros productos</h1>
      </div>

      <div className="mb-4 md:hidden">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="w-full btn-glass text-center"
        >
          Filtrar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="hidden lg:block lg:col-span-1 order-1">
          <div className="sticky top-24">
            {catLoading && <p className="p-4">Cargando categorías...</p>}
            {catError && (
              <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded mb-4">
                Error al cargar categorías: {catError.message}
              </div>
            )}
            {!catLoading && !catError && <CategoryFilter inline />}
          </div>
        </aside>

        <div className="lg:col-span-3 order-2">
          {prodLoading && <p>Cargando productos...</p>}
          {prodError && (
            <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded mb-4">
              Error al cargar productos: {prodError.message}
            </div>
          )}
          {!prodLoading && !prodError && (
            <>
              <div className="grid gap-6 grid-cols-2 md:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <button
                  className="px-6 py-3 rounded bg-teal-400 hover:bg-teal-500 text-white font-semibold"
                  onClick={() => setFirst((n) => n + 12)}
                >
                  Cargar más productos
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-2xl max-h-[70vh] overflow-y-auto">
            {catLoading && <p className="p-4">Cargando categorías...</p>}
            {catError && <p className="p-4">Error al cargar categorías.</p>}
            {!catLoading && !catError && <CategoryFilter />}
          </div>
        </div>
      )}
    </section>
  );
}

export default Products;
