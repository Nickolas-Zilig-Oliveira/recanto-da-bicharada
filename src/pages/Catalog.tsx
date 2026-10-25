import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ProductCard } from "../components/ProductCard"
import { categories, getCategoryById, products } from "../data/catalog"
import type { Product } from "../types/product"

type SortKey = "relevancia" | "menor-preco" | "maior-preco" | "nome"

const PAGE_SIZE = 8

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevancia", label: "Relevância" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "nome", label: "Nome (A-Z)" },
]

function sortProducts(list: Product[], sort: SortKey) {
  const copy = [...list]
  switch (sort) {
    case "menor-preco":
      return copy.sort((a, b) => a.price - b.price)
    case "maior-preco":
      return copy.sort((a, b) => b.price - a.price)
    case "nome":
      return copy.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
    default:
      return copy
  }
}

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(1)

  const activeCategory = searchParams.get("categoria") ?? ""
  const query = searchParams.get("q") ?? ""
  const sort = (searchParams.get("sort") as SortKey) ?? "relevancia"

  const filtered = useMemo(() => {
    let list = products

    if (activeCategory) {
      list = list.filter((product) => {
        const category = getCategoryById(product.categoryId)
        return category?.slug === activeCategory
      })
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(
        (product) =>
          product.name.toLowerCase().includes(q) || product.brand.toLowerCase().includes(q),
      )
    }

    return sortProducts(list, sort)
  }, [activeCategory, query, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams)
    if (value) {
      next.set(key, value)
    } else {
      next.delete(key)
    }
    setSearchParams(next)
    setPage(1)
  }

  return (
    <div className="mx-auto max-w-content px-6 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl text-carvao">Catálogo</h1>
        <p className="text-sm text-carvao/60">
          Catálogo de exemplo — será substituído pelos produtos reais no painel administrativo.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        {/* Filtros */}
        <aside className="shrink-0 lg:w-56">
          <div className="lg:sticky lg:top-24">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-carvao/50">
              Categorias
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              <li>
                <button
                  type="button"
                  onClick={() => updateParam("categoria", "")}
                  className={`w-full rounded-pill px-3 py-1.5 text-left text-sm transition-colors lg:rounded-card ${
                    activeCategory === ""
                      ? "bg-mata text-creme"
                      : "bg-mata/5 text-carvao/75 hover:bg-mata/10"
                  }`}
                >
                  Todas
                </button>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    onClick={() => updateParam("categoria", category.slug)}
                    className={`w-full rounded-pill px-3 py-1.5 text-left text-sm transition-colors lg:rounded-card ${
                      activeCategory === category.slug
                        ? "bg-mata text-creme"
                        : "bg-mata/5 text-carvao/75 hover:bg-mata/10"
                    }`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Resultados */}
        <div className="flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-carvao/60">
              {filtered.length} {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}
              {query && (
                <>
                  {" "}
                  para <span className="font-medium text-carvao">“{query}”</span>
                </>
              )}
            </p>

            <label className="flex items-center gap-2 text-sm text-carvao/70">
              Ordenar por
              <select
                value={sort}
                onChange={(event) => updateParam("sort", event.target.value)}
                className="rounded-card border border-carvao/15 bg-branco px-3 py-1.5 text-sm text-carvao outline-none focus:border-mata"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {paginated.length === 0 ? (
            <div className="mt-16 flex flex-col items-center justify-center rounded-card bg-mata/5 px-6 py-16 text-center">
              <p className="font-display text-xl text-carvao">Nenhum produto encontrado</p>
              <p className="mt-2 max-w-sm text-sm text-carvao/60">
                Tente ajustar os filtros ou buscar por outro termo.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
              {paginated.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categoryName={getCategoryById(product.categoryId)?.name ?? ""}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={`h-9 w-9 rounded-full text-sm font-medium transition-colors ${
                    pageNumber === currentPage
                      ? "bg-mata text-creme"
                      : "bg-mata/5 text-carvao/70 hover:bg-mata/10"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
