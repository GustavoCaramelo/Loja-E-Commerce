import { useParams, Link } from 'react-router-dom'
import { mockProducts } from '../api/products'
import { useCart } from '../store/cart'

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>()
    const product = mockProducts.find((p) => p.id === Number(id))
    const add = useCart((state) => state.add)

    if (!product) {
        return (
            <div className="p-4">
                <p>Produto não encontrado.</p>
                <Link to="/" className="text-blue-600 underline">Voltar</Link>
            </div>
        )
    }

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <img
                src={product.image}
                alt={product.title}
                className="w-64 h-64 object-cover mb-4"
            />
            <p className="mb-2 text-gray-700">{product.description}</p>
            <p className="mb-4 text-xl font-semibold">R$ {product.price.toFixed(2)}</p>
            <button
                onClick={() =>
                    add(
                        {
                            id: product.id.toString(),
                            name: product.title,
                            price: product.price,
                            image: product.image,
                        },
                        1,
                    )
                }
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Adicionar ao carrinho
            </button>
        </div>
    )
}