import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductList from "../ProductList";
import type { Product } from "../../types/product";

jest.mock("../../store/products", () => ({
    useProducts: jest.fn(),
}));

import { useProducts } from "../../store/products";

describe("ProductList", () => {
    const mockFetchAll = jest.fn();

    const products: Product[] = [
        {
            id: 1,
            title: "Camiseta",
            price: 50,
            description: "",
            category: "Roupas",
            image: "",
            rating: { rate: 4.5, count: 10 },
        },
        {
            id: 2,
            title: "Notebook",
            price: 3000,
            description: "",
            category: "Eletrônicos",
            image: "",
            rating: { rate: 4.8, count: 5 },
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        const mockedUseProducts = useProducts as unknown as jest.Mock;

        mockedUseProducts.mockReturnValue({
            items: products,
            loading: false,
            error: "",
            fetchAll: mockFetchAll,
        });
    });

    it("exibe estado de carregamento", () => {
        const mockedUseProducts = useProducts as unknown as jest.Mock;

        mockedUseProducts.mockReturnValue({
            items: products,
            loading: false,
            error: "",
            fetchAll: mockFetchAll,
        });

        render(
            <MemoryRouter>
                <ProductList
                    search=""
                    category=""
                    priceRange={[0, 5000]}
                    sortBy="price"
                />
            </MemoryRouter>
        );

        expect(screen.getByText(/carregando/i)).toBeInTheDocument();
    });

    it("exibe mensagem de erro", () => {
        const mockedUseProducts = useProducts as unknown as jest.Mock;

        mockedUseProducts.mockReturnValue({
            items: products,
            loading: false,
            error: "",
            fetchAll: mockFetchAll,
        });

        render(
            <MemoryRouter>
                <ProductList
                    search=""
                    category=""
                    priceRange={[0, 5000]}
                    sortBy="price"
                />
            </MemoryRouter>
        );

        expect(screen.getByText(/erro ao carregar produtos/i)).toBeInTheDocument();
    });

    it("renderiza produtos filtrados", () => {
        render(
            <MemoryRouter>
                <ProductList
                    search="camiseta"
                    category=""
                    priceRange={[0, 5000]}
                    sortBy="price"
                />
            </MemoryRouter>
        );

        expect(screen.getByText(/camiseta/i)).toBeInTheDocument();
        expect(screen.queryByText(/notebook/i)).not.toBeInTheDocument();
    });

    it("chama fetchAll no carregamento inicial", () => {
        render(
            <MemoryRouter>
                <ProductList
                    search=""
                    category=""
                    priceRange={[0, 5000]}
                    sortBy="price"
                />
            </MemoryRouter>
        );

        expect(mockFetchAll).toHaveBeenCalled();
    });

    it("mostra botão 'Carregar mais' quando há mais produtos", () => {
        render(
            <MemoryRouter>
                <ProductList
                    search=""
                    category=""
                    priceRange={[0, 5000]}
                    sortBy="price"
                />
            </MemoryRouter>
        );

        expect(
            screen.queryByRole("button", { name: /carregar mais/i })
        );
    });
});