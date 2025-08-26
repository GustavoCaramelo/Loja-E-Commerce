import React, { useState, useEffect } from "react";
import { useProducts } from "../store/products";
import ProductCard from "./ProductCard";
import type { Product } from "../types/product";
import { Link } from "react-router-dom";

interface Props {
    search: string;
    category: string;
    priceRange: [number, number];
    sortBy: "price" | "rating";
}

const ProductList: React.FC<Props> = ({ search, category, priceRange, sortBy }) => {
    const { items, loading, error, fetchAll } = useProducts();
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    const filtered = items
        .filter((p) =>
            p.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter((p) => (category ? p.category === category : true))
        .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
        .sort((a, b) =>
            sortBy === "price"
                ? a.price - b.price
                : b.rating.rate - a.rating.rate
        );

    const paginated = filtered.slice(0, page * itemsPerPage);

    if (loading) return <p className="p-4">Carregando...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
                {paginated.map((p: Product) => (
                    <Link key={p.id} to={`/product/${p.id}`}>
                        <ProductCard product={p} />
                    </Link>
                ))}
            </div>
            {paginated.length < filtered.length && (
                <div className="text-center mb-4">
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Carregar mais
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductList;
