
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Signup from './components/Signup/Signup.jsx'
import Login from './components/Login/Login.jsx'

import "@fortawesome/fontawesome-free"
import Home from './components/Home/Home.jsx'
import ProtectedRoutes from './components/protected routes/ProtectedRoutes.jsx'
import UserProvider from './Context/UserContext/User.context.jsx'
import GuestRoute from './components/GuestRoute/GuestRoute.jsx'
import Cart from './components/Cart/Cart.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import CartProvider from './Context/CartContext/Cart.context.jsx'
import ProductDetail from './components/ProductDetail/ProductDetail.jsx'
import Checkout from './components/Checkout/Checkout.jsx'
import AllOrders from './components/AllOrders/AllOrders.jsx'
import { Toaster } from './../node_modules/react-hot-toast/src/components/toaster';
import Products from './components/Products/Products.jsx'
import ProductsProvider from './Context/Products/Products.context.jsx'
import VerifyCode from './components/VerifyCode/VerifyCode.jsx'
import ResetPassword from './components/ResetPassword/ResetPassword.jsx'
import Categories from './components/Categories/Categories.jsx'
import SubCategory from './components/SubCategory/SubCategory.jsx'
import Brands from './components/Brands/Brands.jsx'
import Wishlist from './components/Wishlist/Wishlist.jsx'

function App() {

  let routes = createBrowserRouter([{
    path: '/',
    element: <ProtectedRoutes><Layout /></ProtectedRoutes>,
    children: [
      { path: '/', element: <Home /> },
      { path: '/cart', element: <Cart /> },
      { path: '/product/:id', element: <ProductDetail /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/allorders", element: <AllOrders /> },
      { path: "/products", element: <Products /> },
      {path:"/categories", element: <Categories /> },
      {path: "/sub-category/:id", element: <SubCategory /> },
      {path:"/brands", element: <Brands /> },
      {path: "/wishlist", element: <Wishlist /> },
    ]
  },
  {
    path: '/',
    element: <GuestRoute> <Layout /> </GuestRoute>,
    children: [
      { path: '/sign-up', element: <Signup /> },
      { path: '/login', element: <Login /> },
      {path: 'verify-code', element: <VerifyCode />},
      { path: 'reset-password', element: <ResetPassword />}
    ]
  }
  ])
  let ct1 = new QueryClient()
  return <>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <QueryClientProvider client={ct1}>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <RouterProvider router={routes} />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </QueryClientProvider>
  </>

}

export default App
