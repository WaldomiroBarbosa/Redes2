import React, { useState } from 'react'
import './App.css'
import { Login } from "./componentes/Login"
import { Register } from "./componentes/Register"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


function App () 
{
  const[currentForm, setCurrentForm] = useState('login');

  const router = createBrowserRouter([
    {
      path: '/',
      element: <div><Login /></div>
    },
    {
      path: '/register',
      element: <div><Register /></div>
    }
  ])

  const toggleForm = (formNome) => 
  {
    setCurrentForm(formNome)
  }

    return (
      <div  className="App">
        {
          <RouterProvider router={router}/>
        }
      </div>
    );

  
}

export default App;
