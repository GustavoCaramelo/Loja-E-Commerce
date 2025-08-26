import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import NotFound from '../pages/NotFound'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'product/:id', element: <ProductDetails /> },
            { path: 'cart', element: <Cart /> },
            { path: 'checkout', element: <Checkout /> },
            { path: '*', element: <NotFound /> },
        ],
    },
])