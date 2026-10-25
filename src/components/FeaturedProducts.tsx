import { Link } from "react-router-dom"
import { getCategoryById, products } from "../data/catalog"
import { ProductCard } from "./ProductCard"

export function FeaturedProducts() {
  const featured = products.filter((product) => product.stock > 0).slice(0, 6)

  return (
    <section id="catalogo" className="bg-verde-suave/40 py-16 sm:py-20">
      <div className="mx-auto max-w-content px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-carvao sm:text-3xl">Produtos em destaque</h2>
            <p className="mt-1 text-sm text-carvao/60">
              Catálogo de exemplo — será substituído pelos produtos reais no painel administrativo.
            </p>
          </div>
          <Link to="/catalogo" className="shrink-0 text-sm font-medium text-mata hover:underline">
            Ver catálogo completo →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categoryName={getCategoryById(product.categoryId)?.name ?? ""}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
