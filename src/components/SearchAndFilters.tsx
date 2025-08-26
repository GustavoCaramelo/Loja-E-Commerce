import React from "react";

interface Props {
    search: string;
    setSearch: (value: string) => void;
    category: string;
    setCategory: (value: string) => void;
    priceRange: [number, number];
    setPriceRange: (value: [number, number]) => void;
    categories: string[];
}

const SearchAndFilters: React.FC<Props> = ({
    search,
    setSearch,
    category,
    setCategory,
    priceRange,
    setPriceRange,
    categories,
}) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPriceRange([0, Number(e.target.value)]);
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white rounded-lg shadow">
            <input
                type="text"
                placeholder="Buscar produtos..."
                value={search}
                onChange={handleSearchChange}
                className="border p-2 rounded w-full sm:w-1/3"
            />

            <select
                value={category}
                onChange={handleCategoryChange}
                className="border p-2 rounded w-full sm:w-1/3"
            >
                <option value="">Todas categorias</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <div className="flex flex-col sm:flex-row items-center gap-2">
                <label className="text-sm">Preço até:</label>
                <input
                    type="number"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="border p-2 rounded w-24"
                />
            </div>
        </div>
    );
};

export default SearchAndFilters;
