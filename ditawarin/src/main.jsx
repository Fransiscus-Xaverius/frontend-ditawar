import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Navbar from './components/Navbar.jsx'
import Register from './Register.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
