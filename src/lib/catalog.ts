import type { Product } from '../types/product'

export type SortKey = 'price-asc' | 'price-desc' | 'rating-asc' | 'rating-desc'

export type Filters = {
  q: string
  category: string | 'all'
  minPrice?: number
  maxPrice?: number
}

export function applyFilters(products: Product[], f: Filters): Product[] {
  const q = f.q.trim().toLowerCase()
  return products.filter((p) => {
    const matchesText = q
      ? p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      : true
    const matchesCat = f.category === 'all' ? true : p.category === f.category
    const matchesMin = f.minPrice != null ? p.price >= f.minPrice : true
    const matchesMax = f.maxPrice != null ? p.price <= f.maxPrice : true
    return matchesText && matchesCat && matchesMin && matchesMax
  })
}

export function applySort(
  products: Product[],
  sort: SortKey | null,
): Product[] {
  if (!sort) return products
  const items = [...products]
  if (sort === 'price-asc') items.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') items.sort((a, b) => b.price - a.price)
  if (sort === 'rating-asc')
    items.sort((a, b) => (a.rating?.rate ?? 0) - (b.rating?.rate ?? 0))
  if (sort === 'rating-desc')
    items.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
  return items
}

export function slicePage(
  products: Product[],
  page: number,
  pageSize: number,
): Product[] {
  const start = (page - 1) * pageSize
  return products.slice(start, start + pageSize)
}
