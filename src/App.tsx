import React from 'react';
import Navbar from './estaticos/Navbar/Navbar';
import Footer from './estaticos/Footer/Footer';
import { Grid } from '@material-ui/core'
import Home from './paginas/home/Home'
import './App.css';

function App() {
  return (
   <>
   <Navbar />
   <Home />
   <Footer />
   </>
  );
}

export default App;
