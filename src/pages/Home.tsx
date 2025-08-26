import React, { useEffect, useState } from "react";
import SearchAndFilters from "../components/SearchAndFilters";
import ProductList from "../components/ProductList";
import { useCart } from "../store/cart";

const Home: React.FC = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [sortBy, setSortBy] = useState<"price" | "rating">("price");

    const categories = ["Eletrônicos", "Roupas", "Livros", "Brinquedos"];
    const hydrate = useCart((s) => s.hydrate)
    useEffect(() => { hydrate() }, [hydrate])
    
    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center p-4">
                <SearchAndFilters
                    search={search}
                    setSearch={setSearch}
                    category={category}
                    setCategory={setCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    categories={categories}
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "price" | "rating")}
                    className="border p-2 rounded ml-4"
                >
                    <option value="price">Ordenar por preço</option>
                    <option value="rating">Ordenar por avaliação</option>
                </select>
            </div>
            <ProductList
                search={search}
                category={category}
                priceRange={priceRange}
                sortBy={sortBy}
            />
        </div>
    );
};

export default Home;
