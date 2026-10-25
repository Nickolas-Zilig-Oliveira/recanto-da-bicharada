import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabase"
import type { Tables } from "../types/database"

const tiles = [
  "bg-mata text-creme hover:bg-mata-escuro",
  "bg-dourado text-mata hover:bg-dourado-escuro",
  "border-2 border-mata bg-transparent text-mata hover:bg-mata hover:text-creme",
]

export function CategoryGrid() {
  const [categories, setCategories] = useState<Tables<"categories">[]>([])

  useEffect(() => {
    supabase
      .from("categories")
      .select("*")
      .eq("active", true)
      .order("position")
      .then(({ data }) => setCategories(data ?? []))
  }, [])

  if (categories.length === 0) return null

  return (
    <section id="categorias" className="mx-auto max-w-content px-6 py-20 sm:py-28">
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-mata pb-5">
        <h2 className="font-display text-2xl font-semibold text-carvao sm:text-3xl">
          O que vendemos
        </h2>
        <span className="price-tag text-xs text-carvao/50">{categories.length} categorias</span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            to={`/catalogo?categoria=${category.slug}`}
            className={`flex h-28 items-end p-4 transition-colors duration-150 ${tiles[index % tiles.length]}`}
          >
            <span className="font-display text-lg font-semibold leading-tight sm:text-xl">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
