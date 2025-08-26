import { create } from 'zustand'
import type { Product } from '../types/product'
import { fetchAllProducts, fetchProductById } from '../api/products'

export type ProductsState = {
  items: Product[]
  loading: boolean
  error: string | null
  loadedAt?: number
  fetchAll: () => Promise<void>
  getById: (id: number) => Promise<Product | undefined>
}

export const useProducts = create<ProductsState>((set, get) => ({
  items: [],
  loading: false,
  error: null,
  async fetchAll() {
    if (get().items.length > 0) return
    set({ loading: true, error: null })
    try {
      const data = await fetchAllProducts()
      set({ items: data, loading: false, loadedAt: Date.now() })
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao carregar produtos'
      set({ error: message, loading: false })
    }
  },
  async getById(id) {
    const found = get().items.find((p) => p.id === id)
    if (found) return found
    return fetchProductById(id)
  },
}))
