import { sampleProducts } from "../data/sampleProducts"
import { ProductCard } from "./ProductCard"

export function FeaturedProducts() {
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
        </div>

        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
