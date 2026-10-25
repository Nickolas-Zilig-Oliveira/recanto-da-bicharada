import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabase"
import type { Tables } from "../types/database"

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
      <div className="flex items-baseline justify-between gap-4 border-b border-carvao/10 pb-5">
        <h2 className="font-display text-2xl text-carvao sm:text-3xl">O que vendemos</h2>
        <span className="text-xs uppercase tracking-[0.2em] text-carvao/40">
          {categories.length} categorias
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category, index) => {
          const dark = index % 2 === 0
          return (
            <Link
              key={category.id}
              to={`/catalogo?categoria=${category.slug}`}
              className={`group flex h-28 items-end p-4 transition-opacity duration-150 hover:opacity-90 ${
                dark ? "surface-mata text-creme" : "surface-sand text-mata"
              }`}
            >
              <span className="font-display text-lg leading-tight sm:text-xl">{category.name}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
