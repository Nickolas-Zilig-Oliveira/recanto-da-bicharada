// Dados de exemplo para visualização do layout.
// Devem ser substituídos pelo catálogo real na Fase 3 (painel administrativo).
export type SampleProduct = {
  id: string
  name: string
  category: string
  unit: string
  price: number
  tone: "mata" | "terracota" | "verde-suave"
}

export const sampleCategories = [
  { id: "racoes", name: "Rações", tone: "mata" as const },
  { id: "aves", name: "Aves & Pássaros", tone: "terracota" as const },
  { id: "acessorios", name: "Acessórios Pet", tone: "verde-suave" as const },
  { id: "garden", name: "Garden", tone: "mata" as const },
]

export const sampleProducts: SampleProduct[] = [
  { id: "1", name: "Ração Premium Cães Adultos", category: "Rações", unit: "15kg", price: 189.9, tone: "mata" },
  { id: "2", name: "Mistura para Pássaros Silvestres", category: "Aves & Pássaros", unit: "5kg", price: 42.5, tone: "terracota" },
  { id: "3", name: "Ração Filhotes Gatos", category: "Rações", unit: "3kg", price: 69.9, tone: "verde-suave" },
  { id: "4", name: "Comedouro de Campo Inox", category: "Acessórios Pet", unit: "unidade", price: 54.0, tone: "mata" },
  { id: "5", name: "Ração Codornas Postura", category: "Rações", unit: "25kg", price: 94.0, tone: "terracota" },
  { id: "6", name: "Substrato para Garden", category: "Garden", unit: "20L", price: 38.9, tone: "verde-suave" },
]
