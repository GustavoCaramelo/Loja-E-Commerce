import { Link } from 'react-router-dom'
import { useCart } from '../store/cart'

export default function Cart() {
    const { items, remove, setQty, clear } = useCart()

    if (items.length === 0) {
        return <div className="p-4">Seu carrinho está vazio.</div>
    }

    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Carrinho</h1>
            <ul>
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="flex justify-between items-center border-b py-2"
                    >
                        <div>
                            <p>{item.name}</p>
                            <p className="text-gray-600">
                                R$ {item.price.toFixed(2)} x {item.qty}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={item.qty}
                                min={1}
                                onChange={(e) => setQty(item.id, Number(e.target.value))}
                                className="border p-1 w-16"
                            />
                            <button
                                onClick={() => remove(item.id)}
                                className="text-red-500 hover:underline"
                            >
                                Remover
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <p className="text-xl font-semibold mt-4">
                Total: R$ {total.toFixed(2)}
            </p>
            <div className="flex items-center gap-4 mt-4">
                <button
                    onClick={clear}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    Limpar carrinho
                </button>
                <Link
                    to="/checkout"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    aria-label="Ir para checkout"
                >
                    Finalizar compra
                </Link>
            </div>
        </div>
    )
}