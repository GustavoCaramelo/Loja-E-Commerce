import { create } from 'zustand'

export type CartItem = {
  id: string
  name: string
  price: number
  image?: string
  qty: number
}

type CartState = {
  items: CartItem[]
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  remove: (id: string) => void
  clear: () => void
  setQty: (id: string, qty: number) => void
  hydrate: () => void
}

export const useCart = create<CartState>((set) => ({
  items: [],
  add: (item, qty = 1) =>
    set((state) => {
      const exists = state.items.find((i) => i.id === item.id)
      const next = exists
        ? state.items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + qty } : i,
          )
        : [...state.items, { ...item, qty }]
      // salva
      localStorage.setItem('cart-items', JSON.stringify(next))
      return { items: next }
    }),
  remove: (id) =>
    set((state) => {
      const next = state.items.filter((i) => i.id !== id)
      localStorage.setItem('cart-items', JSON.stringify(next))
      return { items: next }
    }),
  clear: () => {
    localStorage.removeItem('cart-items')
    set({ items: [] })
  },
  setQty: (id, qty) =>
    set((state) => {
      const next = state.items.map((i) => (i.id === id ? { ...i, qty } : i))
      localStorage.setItem('cart-items', JSON.stringify(next))
      return { items: next }
    }),
  hydrate: () => {
    try {
      const raw = localStorage.getItem('cart-items')
      if (raw) set({ items: JSON.parse(raw) })
    } catch {
      // se falhar, ignora
    }
  },
}))
