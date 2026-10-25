import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { ProductCard, type ProductCardData } from "./ProductCard"

export function FeaturedProducts() {
  const [products, setProducts] = useState<ProductCardData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from("products")
      .select("*, categories(name, slug), brands(name)")
      .eq("active", true)
      .gt("stock_quantity", 0)
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => {
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
        setLoading(false)
      })
  }, [])

  if (!loading && products.length === 0) return null

  return (
    <section id="catalogo" className="bg-verde-suave/40 py-16 sm:py-20">
      <div className="mx-auto max-w-content px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-carvao sm:text-3xl">Produtos em destaque</h2>
            <p className="mt-1 text-sm text-carvao/60">Direto do catálogo da loja.</p>
          </div>
          <Link to="/catalogo" className="shrink-0 text-sm font-medium text-mata hover:underline">
            Ver catálogo completo →
          </Link>
        </div>

        {loading ? (
          <p className="mt-8 text-sm text-carvao/50">Carregando...</p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
