import React, { useState, useEffect } from 'react';
import './App.css';
import { Login } from './componentes/Login';
import { Register } from './componentes/Register';
import { Home } from './componentes/Home';
import { RoomStatus } from './componentes/RoomStatus';
import { Grupo } from './componentes/Grupo';
import { ConfirmationPage } from './componentes/ConfirmationPage';
import { createBrowserRouter, RouterProvider, Route, Routes } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login/></div>
  },
  {
    path: '/register',
    element: <div><Register/></div>
  },
  {
    path: '/home',
    element: <div><Home userName="Nome do Usuário"/></div>
  },
  {
    path: '/room',
    element: <div><RoomStatus /></div>
  },
  {
    path: '/confirmation/:studentId',
    element: <div><ConfirmationPage /></div>
  }, 
  {
    path: '/grupo',
    element: <div><Grupo /></div>
  }
]);

function App () 
{

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Verificar se há dados de usuário no localStorage
    const storedUser = localStorage.getItem('user');
    console.log(localStorage);

    if (storedUser) {
      const user = JSON.parse(JSON.stringify(storedUser));
      setLoggedIn(true);
      setUserName(user.name);
    }
  }, []);

  return (
    <div className="App">
      <RouterProvider router= {router}>
        <Routes>
          {isLoggedIn ? (
            <Route path="/" element={<Home />} />
          ) : (
            <>
              <Route
                path="/"
                element={<Login />}
              />
              <Route path="/register" element={<Register />} />
            </>
          )}
        </Routes>
      </RouterProvider>
    </div>
  );
}

export default App;
