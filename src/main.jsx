import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home, Login, Register, ProductList, AddProduct, UpdateProduct } from './components'
import AuthLayout from './components/AuthLayout.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/all-products",
        element: (<AuthLayout authentication> {" "} <ProductList /> </AuthLayout>)
      },
      {
        path: "/add-product",
        element: (<AuthLayout authentication> {" "} <AddProduct /> </AuthLayout>)
      },
      {
        path: "/product/:id/update",
        element: (<AuthLayout authentication> {" "} <UpdateProduct /> </AuthLayout>)
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />,
)
