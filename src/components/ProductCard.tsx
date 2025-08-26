import React from "react";
import type { Product } from "../types/product";

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <div>
            <img
                src={product.image}
                alt={product.title}
                className="h-40 w-auto mx-auto object-contain mb-2"
                loading="lazy"
            />
            <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
            <p className="text-gray-500 text-xs">{product.category}</p>
            <p className="text-lg font-bold mt-1">R$ {product.price.toFixed(2)}</p>
            <div className="text-yellow-500 text-xs mt-1">
                ⭐ {product.rating.rate} ({product.rating.count})
            </div>
        </div>
    );
};

export default ProductCard;
