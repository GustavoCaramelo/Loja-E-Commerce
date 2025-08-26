import { type FormEvent, useMemo, useRef, useState } from 'react'
import { useCart } from '../store/cart'
import { Link, useNavigate } from 'react-router-dom'

export default function Checkout() {
    const { items, clear } = useCart()
    const navigate = useNavigate()
    const [submitting, setSubmitting] = useState(false)
    const liveRef = useRef<HTMLDivElement>(null)

    const total = useMemo(
        () => items.reduce((acc, i) => acc + i.price * i.qty, 0),
        [items]
    )

    if (items.length === 0) {
        return (
            <div className="p-6 max-w-2xl mx-auto text-center">
                <p>Seu carrinho está vazio.</p>
                <Link to="/" className="text-blue-600 underline mt-2 inline-block">
                    Voltar para a loja
                </Link>
            </div>
        )
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        if (!form.checkValidity()) {
            form.reportValidity()
            liveRef.current?.focus()
            return
        }
        setSubmitting(true)

        setTimeout(() => {
            setSubmitting(false)
            clear()
            navigate('/', { replace: true })
            alert('Pedido realizado com sucesso! (mock)')
        }, 900)
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>

            <div
                ref={liveRef}
                tabIndex={-1}
                aria-live="polite"
                className="sr-only"
            />

            <div className="mb-6 border rounded p-4 bg-white">
                <h2 className="font-semibold mb-2">Resumo</h2>
                <ul className="divide-y">
                    {items.map((i) => (
                        <li key={i.id} className="py-2 flex justify-between">
                            <span>{i.name} × {i.qty}</span>
                            <span>R$ {(i.price * i.qty).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-3 text-right font-bold">
                    Total: R$ {total.toFixed(2)}
                </div>
            </div>

            <form
                className="grid gap-4 bg-white p-4 rounded border"
                onSubmit={handleSubmit}
                noValidate
            >
                <fieldset className="grid gap-3">
                    <legend className="font-semibold">Dados Pessoais</legend>
                    <label className="grid gap-1">
                        <span className="text-sm">Nome completo</span>
                        <input
                            name="name"
                            required
                            minLength={3}
                            className="border rounded p-2"
                            autoComplete="name"
                        />
                    </label>
                    <label className="grid gap-1">
                        <span className="text-sm">E-mail</span>
                        <input
                            type="email"
                            name="email"
                            required
                            className="border rounded p-2"
                            autoComplete="email"
                        />
                    </label>
                </fieldset>

                <fieldset className="grid gap-3">
                    <legend className="font-semibold">Endereço</legend>
                    <label className="grid gap-1">
                        <span className="text-sm">Endereço</span>
                        <input
                            name="address"
                            required
                            className="border rounded p-2"
                            autoComplete="street-address"
                        />
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <label className="grid gap-1">
                            <span className="text-sm">Cidade</span>
                            <input name="city" required className="border rounded p-2" />
                        </label>
                        <label className="grid gap-1">
                            <span className="text-sm">CEP</span>
                            <input
                                name="zip"
                                required
                                pattern="\\d{5}-?\\d{3}"
                                placeholder="00000-000"
                                className="border rounded p-2"
                                inputMode="numeric"
                            />
                        </label>
                    </div>
                </fieldset>

                <fieldset className="grid gap-3">
                    <legend className="font-semibold">Pagamento (mock)</legend>
                    <label className="grid gap-1">
                        <span className="text-sm">Número do cartão</span>
                        <input
                            name="card"
                            required
                            minLength={13}
                            maxLength={19}
                            className="border rounded p-2"
                            inputMode="numeric"
                            autoComplete="cc-number"
                        />
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <label className="grid gap-1">
                            <span className="text-sm">Validade (MM/AA)</span>
                            <input
                                name="exp"
                                required
                                pattern="\\d{2}/\\d{2}"
                                placeholder="12/29"
                                className="border rounded p-2"
                                inputMode="numeric"
                                autoComplete="cc-exp"
                            />
                        </label>
                        <label className="grid gap-1">
                            <span className="text-sm">CVV</span>
                            <input
                                name="cvv"
                                required
                                minLength={3}
                                maxLength={4}
                                className="border rounded p-2"
                                inputMode="numeric"
                                autoComplete="cc-csc"
                            />
                        </label>
                    </div>
                </fieldset>

                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
                    aria-busy={submitting}
                >
                    {submitting ? 'Processando…' : 'Confirmar pedido'}
                </button>
            </form>
        </div>
    )
}
