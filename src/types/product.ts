export type Tone = "mata" | "terracota" | "verde-suave"

export type Category = {
  id: string
  name: string
  slug: string
  tone: Tone
}

export type Product = {
  id: string
  slug: string
  name: string
  description: string
  brand: string
  categoryId: string
  unit: string
  price: number
  stock: number
  tone: Tone
}
