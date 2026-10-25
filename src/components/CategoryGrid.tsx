import { sampleCategories } from "../data/sampleProducts"

const toneStyles = {
  mata: "bg-mata text-creme",
  terracota: "bg-terracota text-creme",
  "verde-suave": "bg-verde-suave text-mata",
}

export function CategoryGrid() {
  return (
    <section id="categorias" className="mx-auto max-w-content px-6 py-16 sm:py-20">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-display text-2xl text-carvao sm:text-3xl">Explore por categoria</h2>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {sampleCategories.map((category) => (
          <a
            key={category.id}
            href={`#catalogo`}
            className={`group flex h-28 flex-col justify-end rounded-card p-4 transition-transform duration-150 hover:-translate-y-0.5 ${toneStyles[category.tone]}`}
          >
            <span className="font-display text-base sm:text-lg">{category.name}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
