import { render, screen, fireEvent } from "@testing-library/react";
import SearchAndFilters from "../SearchAndFilters";

describe("SearchAndFilters", () => {
    const mockSetSearch = jest.fn();
    const mockSetCategory = jest.fn();
    const mockSetPriceRange = jest.fn();

    const props = {
        search: "",
        setSearch: mockSetSearch,
        category: "",
        setCategory: mockSetCategory,
        priceRange: [0, 100] as [number, number],
        setPriceRange: mockSetPriceRange,
        categories: ["Roupas", "Eletrônicos"],
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renderiza campos e categorias corretamente", () => {
        render(<SearchAndFilters {...props} />);
        expect(screen.getByPlaceholderText(/buscar produtos/i)).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toBeInTheDocument();
        expect(screen.getByText(/todas categorias/i)).toBeInTheDocument();
        expect(screen.getByText(/Roupas/i)).toBeInTheDocument();
        expect(screen.getByText(/Eletrônicos/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Preço até:/i)).toBeInTheDocument();
    });

    it("chama setSearch ao digitar no input de busca", () => {
        render(<SearchAndFilters {...props} />);
        const searchInput = screen.getByPlaceholderText(/buscar produtos/i);
        fireEvent.change(searchInput, { target: { value: "camisa" } });
        expect(mockSetSearch).toHaveBeenCalledWith("camisa");
    });

    it("chama setCategory ao selecionar uma categoria", () => {
        render(<SearchAndFilters {...props} />);
        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "Roupas" } });
        expect(mockSetCategory).toHaveBeenCalledWith("Roupas");
    });

    it("chama setPriceRange ao alterar o preço máximo", () => {
        render(<SearchAndFilters {...props} />);
        const priceInput = screen.getByRole("spinbutton"); // input type number
        fireEvent.change(priceInput, { target: { value: "50" } });
        expect(mockSetPriceRange).toHaveBeenCalledWith([0, 50]);
    });
});
