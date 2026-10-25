import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ProductCard, type ProductCardData } from "../components/ProductCard"
import { supabase } from "../lib/supabase"
import type { Tables } from "../types/database"

type SortKey = "relevancia" | "menor-preco" | "maior-preco" | "nome"

const PAGE_SIZE = 8

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevancia", label: "Relevância" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "nome", label: "Nome (A-Z)" },
]

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState<Tables<"categories">[]>([])
  const [products, setProducts] = useState<ProductCardData[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  const activeCategory = searchParams.get("categoria") ?? ""
  const query = searchParams.get("q") ?? ""
  const sort = (searchParams.get("sort") as SortKey) ?? "relevancia"

  useEffect(() => {
    supabase
      .from("categories")
      .select("*")
      .eq("active", true)
      .order("position")
      .then(({ data }) => setCategories(data ?? []))
  }, [])

  useEffect(() => {
    setPage(1)
  }, [activeCategory, query, sort])

  useEffect(() => {
    async function load() {
      setLoading(true)

      let request = supabase
        .from("products")
        .select("*, categories!inner(name, slug), brands(name)", { count: "exact" })
        .eq("active", true)

      if (activeCategory) {
        request = request.eq("categories.slug", activeCategory)
      }
      if (query.trim()) {
        request = request.ilike("name", `%${query.trim()}%`)
      }

      switch (sort) {
        case "menor-preco":
          request = request.order("price_cents", { ascending: true })
          break
        case "maior-preco":
          request = request.order("price_cents", { ascending: false })
          break
        case "nome":
          request = request.order("name", { ascending: true })
          break
        default:
          request = request.order("created_at", { ascending: false })
      }

      const from = (page - 1) * PAGE_SIZE
      const { data, count } = await request.range(from, from + PAGE_SIZE - 1)

      setProducts(
        (data ?? []).map((p) => ({
          id: p.id,
          slug: p.slug,
          name: p.name,
          brand: p.brands?.name ?? "",
          unit: p.unit,
          price_cents: p.price_cents,
          stock_quantity: p.stock_quantity,
          low_stock_threshold: p.low_stock_threshold,
          categoryName: p.categories?.name ?? "",
          categorySlug: p.categories?.slug ?? "",
        })),
      )
      setTotal(count ?? 0)
      setLoading(false)
    }
    load()
  }, [activeCategory, query, sort, page])

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams)
    if (value) {
      next.set(key, value)
    } else {
      next.delete(key)
    }
    setSearchParams(next)
  }

  return (
    <div className="mx-auto max-w-content px-6 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl text-carvao">Catálogo</h1>
        <p className="text-sm text-carvao/60">Produtos cadastrados pela loja em tempo real.</p>
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
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

        <div className="flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-carvao/60">
              {total} {total === 1 ? "produto encontrado" : "produtos encontrados"}
              {query && (
                <>
                  {" "}
                  para <span className="font-medium text-carvao">"{query}"</span>
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

          {loading ? (
            <p className="mt-16 text-center text-sm text-carvao/50">Carregando...</p>
          ) : products.length === 0 ? (
            <div className="mt-16 flex flex-col items-center justify-center rounded-card bg-mata/5 px-6 py-16 text-center">
              <p className="font-display text-xl text-carvao">Nenhum produto encontrado</p>
              <p className="mt-2 max-w-sm text-sm text-carvao/60">
                Tente ajustar os filtros ou buscar por outro termo.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
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
                    pageNumber === page ? "bg-mata text-creme" : "bg-mata/5 text-carvao/70 hover:bg-mata/10"
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
