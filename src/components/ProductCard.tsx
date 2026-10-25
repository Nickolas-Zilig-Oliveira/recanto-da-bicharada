import type { SampleProduct } from "../data/sampleProducts"
import { Button } from "./Button"

const toneStyles: Record<SampleProduct["tone"], string> = {
  mata: "bg-mata/90",
  terracota: "bg-terracota/90",
  "verde-suave": "bg-verde-suave",
}

export function ProductCard({ product }: { product: SampleProduct }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-card bg-branco shadow-card transition-shadow duration-200 hover:shadow-lifted">
      <div className={`relative flex h-44 items-center justify-center ${toneStyles[product.tone]}`}>
        <svg viewBox="0 0 48 48" className="h-14 w-14 opacity-80" aria-hidden="true">
          <path
            d="M24 8c6 4 10 10 10 17a10 10 0 1 1-20 0c0-7 4-13 10-17Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-creme"
          />
        </svg>
        <span className="absolute left-3 top-3 rounded-pill bg-branco/90 px-2.5 py-1 text-[11px] font-medium text-carvao">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-sm font-semibold text-carvao">{product.name}</h3>
          <p className="text-xs text-carvao/60">{product.unit}</p>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <span className="font-display text-lg text-mata">
            {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </span>
          <Button variant="primary" className="w-full px-4 py-2 text-xs">
            Adicionar
          </Button>
        </div>
      </div>
    </article>
  )
}
