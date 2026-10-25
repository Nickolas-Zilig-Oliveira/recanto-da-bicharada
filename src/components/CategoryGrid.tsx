import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCategoryTone } from "../lib/categoryTone"
import { supabase } from "../lib/supabase"
import type { Tables } from "../types/database"

const toneStyles = {
  mata: "bg-mata text-creme",
  terracota: "bg-terracota text-creme",
  "verde-suave": "bg-verde-suave text-mata",
}

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
    <section id="categorias" className="mx-auto max-w-content px-6 py-16 sm:py-20">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-display text-2xl text-carvao sm:text-3xl">Explore por categoria</h2>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/catalogo?categoria=${category.slug}`}
            className={`group flex h-28 flex-col justify-end rounded-card p-4 transition-transform duration-150 hover:-translate-y-0.5 ${toneStyles[getCategoryTone(category.slug)]}`}
          >
            <span className="font-display text-base sm:text-lg">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
