import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/estaticos/Navbar/Navbar';
import Footer from './components/estaticos/Footer/Footer';
import Home from './paginas/home/Home'
import Login from './paginas/login/Login'
import './App.css';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';

function App() {
  return (
    <Router>

      <Navbar />

      <Routes>

        <Route path='*' element={<Login />}>
        </Route>
        <Route path='/login' element={<Login />}>
        </Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/cadastrousuario' element={<CadastroUsuario />}></Route>
      </Routes>



      <Footer />

    </Router>
  );
}

export default App;
