export type Tone = "mata" | "terracota" | "verde-suave"

const toneByCategorySlug: Record<string, Tone> = {
  racoes: "mata",
  acessorios: "verde-suave",
  aves: "terracota",
  pintinhos: "mata",
  codornas: "verde-suave",
  medicamentos: "terracota",
  garden: "mata",
}

export function getCategoryTone(slug: string | undefined): Tone {
  if (slug && slug in toneByCategorySlug) return toneByCategorySlug[slug]
  return "mata"
}
