import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Navbar from './components/Navbar.jsx'

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
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
