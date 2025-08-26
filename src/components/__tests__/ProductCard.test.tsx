import { render, screen } from "@testing-library/react";
import ProductCard from "../ProductCard";
import type { Product } from "../../types/product";

describe("ProductCard", () => {
    const mockProduct: Product = {
        id: 1,
        title: "Camiseta Básica",
        price: 99.9,
        description: "Uma camiseta confortável",
        category: "Roupas",
        image: "https://example.com/camiseta.jpg",
        rating: { rate: 4.5, count: 10 },
    };

    it("renderiza corretamente as informações do produto", () => {
        render(<ProductCard product={mockProduct} />);

        // Verifica se a imagem aparece com alt correto
        const img = screen.getByRole("img", { name: /camiseta básica/i });
        expect(img).toHaveAttribute("src", mockProduct.image);

        // Verifica título, categoria, preço e avaliação
        expect(screen.getByText(/camiseta básica/i)).toBeInTheDocument();
        expect(screen.getByText(/roupas/i)).toBeInTheDocument();
        expect(screen.getByText(/R\$ 99\.90/i)).toBeInTheDocument();
        expect(screen.getByText(/⭐ 4.5/i)).toBeInTheDocument();
        expect(screen.getByText(/\(10\)/)).toBeInTheDocument();
    });
});
