import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Register from './components/Register/Register';
import Brands from './components/Brands/Brands';
import Notfound from './components/Notfound/Notfound';
import './App.css';
import Layout from './components/Layout/Layout';
import { UserContextProvider } from './components/Context/UserContext';
import { CartContextProvider } from './components/Context/CartContext'; // Ensure correct import
import ProtectedRoute from './components/ProtectedRoute'; 
import ProductDetailes from './components/ProductDetailes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Forget from './components/Forget';
import ResetPass from './components/ResetPass';
import NewPass from './components/NewPass';
import CheckOut from './components/CheckOut';

// Initialize React Query client
const queryClient = new QueryClient();

function App() {
  // Define routes
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <ProtectedRoute><Home /></ProtectedRoute>,
        },
        {
          path: "products",
          element: <ProtectedRoute><Products /></ProtectedRoute>,
        },
        {
          path: "productDetailes/:id",
          element: <ProtectedRoute><ProductDetailes /></ProtectedRoute>,
        },
        {
          path: "cart",
          element: <ProtectedRoute><Cart /></ProtectedRoute>,
        },
        {
          path: "categories",
          element: <ProtectedRoute><Categories /></ProtectedRoute>,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "checkout",
          element: <CheckOut />,
        },
        {
          path: "forget",
          element: <Forget />,
        },
        {
          path: "reset",
          element: <ResetPass/>,
        },
        {
          path: "newpassword",
          element: <NewPass/>,
        },
        {
          path: "brands",
          element: <ProtectedRoute><Brands /></ProtectedRoute>,
        },
        
        {
          path: "*",
          element: <Notfound />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <CartContextProvider>
          <RouterProvider router={routes} />
          <ReactQueryDevtools initialIsOpen={false} /> {/* Use initialIsOpen to control default open state */}
      </CartContextProvider>
    </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
