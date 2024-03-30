import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import Layout from './Pages/Layout/Layout'
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './Home'
import Guide from './Pages/Guide/Guide'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'

const router=createBrowserRouter(
  createRoutesFromElements(
    
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/> }/>
      <Route path='Guide' element={<Guide/>} />
      <Route path='Login' element={<Login/>} />
  
      {/* yea userId ka access we will get inside the element automatically using useParams */}
    </Route>
  )
  )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}/>
  </React.StrictMode>,
)
