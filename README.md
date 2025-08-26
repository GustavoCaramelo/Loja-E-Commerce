Loja React — Catálogo de Produtos

Aplicação web responsiva que lista produtos, permite busca e filtragem, exibe detalhes e possui um carrinho persistente com checkout simulado.

Tecnologias usadas

- React + Vite + TypeScript

- Zustand para estado global

- React Router DOM para rotas

- Tailwind CSS para estilos

- Jest + React Testing Library para testes

- Vercel para deploy

Estrutura do projeto
src/
├─ api/
│ └─ products.ts
├─ components/
│ ├─ __tests__/
│ │ ├─ Button.test.tsx
│ │ ├─ ProductCard.test.tsx
│ │ ├─ ProductList.test.tsx
│ │ └─ SearchAndFilters.test.tsx
│ ├─ Button.tsx
│ ├─ ProductCard.tsx
│ ├─ ProductList.tsx
│ ├─ Rating.tsx
│ └─ SearchAndFilters.tsx
├─ lib/
│ └─ catalog.ts
├─ pages/
│ ├─ Cart.tsx
│ ├─ Checkout.tsx
│ ├─ Home.tsx
│ ├─ NotFound.tsx
│ └─ ProductDetails.tsx
├─ routes/
│ └─ index.tsx
├─ store/
│ ├─ cart.ts
│ └─ products.ts
├─ types/
│ └─ product.ts
├─ setupTests.ts
├─ App.tsx
├─ main.tsx
└─ index.html

Funcionalidades principais

- Lista de produtos com imagem, nome, preço, categoria e avaliação.

- Busca por texto e filtros (categoria e faixa de preço).

- Ordenação por preço e avaliação.

- Paginação com botão “Carregar mais”.

- Página de detalhes com galeria e descrição.

- Carrinho persistente (localStorage) com adicionar, remover, atualizar.

- Checkout mockado com formulário validado.

- Estados de carregamento e erro.

- Testes unitários e boas práticas de acessibilidade.

Como rodar localmente
Pré-requisitos
npm ou yarn

Instalação
git clone https://github.com/seu-usuario/loja-react.git
cd loja-react
npm install

Ambiente de desenvolvimento
npm run dev
Acesse: http://localhost:5173

Testes
npm run test

Decisões técnicas

- Vite + TypeScript para desenvolvimento rápido e seguro.

- Zustand pela simplicidade e persistência do estado do carrinho.

- React Hook Form + Zod para validação de formulários.

- Tailwind para produtividade e responsividade.

- Jest + RTL para testes unitários e integração.