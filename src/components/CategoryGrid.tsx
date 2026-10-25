import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Sprig } from "./BrandMotif"
import { supabase } from "../lib/supabase"
import type { Tables } from "../types/database"

// Bento rhythm: first and fourth tiles span two columns, breaking the
// uniform grid a plain category list would otherwise fall into.
const spanPattern = ["lg:col-span-2", "", "", "lg:col-span-2", "", ""]

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

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {categories.map((category, index) => {
          const dark = index % 3 !== 1
          return (
            <Link
              key={category.id}
              to={`/catalogo?categoria=${category.slug}`}
              className={`group relative flex h-32 flex-col justify-between overflow-hidden p-4 transition-colors duration-150 sm:h-40 ${spanPattern[index % spanPattern.length]} ${
                dark
                  ? "bg-mata text-creme hover:bg-mata-escuro"
                  : "border border-carvao/15 bg-transparent text-carvao hover:border-mata/40"
              }`}
            >
              <Sprig
                strokeWidth={1}
                className={`pointer-events-none absolute -right-4 -top-6 h-28 w-20 transition-transform duration-300 group-hover:translate-y-1 ${
                  dark ? "text-creme/15" : "text-mata/15"
                }`}
              />
              <span className="relative text-[11px] uppercase tracking-[0.15em] opacity-50">
                Categoria
              </span>
              <span className="relative font-display text-lg leading-tight sm:text-xl">
                {category.name}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
