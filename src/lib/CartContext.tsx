import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type CartItem = {
  productId: string
  slug: string
  name: string
  unit: string
  priceCents: number
  stockQuantity: number
  quantity: number
}

type CartState = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  clear: () => void
  subtotalCents: number
  itemCount: number
}

const STORAGE_KEY = "recanto-cart"

const CartContext = createContext<CartState | undefined>(undefined)

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart())

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage unavailable (private mode, quota) — cart just won't persist
    }
  }, [items])

  function addItem(item: Omit<CartItem, "quantity">, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId)
      if (existing) {
        const nextQty = Math.min(existing.quantity + quantity, item.stockQuantity)
        return prev.map((i) => (i.productId === item.productId ? { ...i, quantity: nextQty } : i))
      }
      return [...prev, { ...item, quantity: Math.min(quantity, item.stockQuantity) }]
    })
  }

  function updateQuantity(productId: string, quantity: number) {
    setItems((prev) =>
      prev
        .map((i) => (i.productId === productId ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0),
    )
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }

  function clear() {
    setItems([])
  }

  const subtotalCents = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, clear, subtotalCents, itemCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
