import { Outlet, Link, NavLink } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">Loja</Link>
          <div className="flex gap-4">
            <NavLink to="/" className={({ isActive }) => isActive ? 'font-semibold underline' : ''}>
              Produtos
            </NavLink>
            <NavLink to="/cart" className={({ isActive }) => isActive ? 'font-semibold underline' : ''}>
              Carrinho
            </NavLink>
            <NavLink to="/checkout" className={({ isActive }) => isActive ? 'font-semibold underline' : ''}>
              Checkout
            </NavLink>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Loja
      </footer>
    </div>
  )
}
