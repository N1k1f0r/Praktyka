import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import Navbar from './components/Navbar';
import Tabela from './components/Tabela.jsx';
import KartotekaDetails from './components/KartotekaDetails';
import AddKartotekaItem from './components/AddKartotekaItem';
import data from './szk01_2024_kart_full_data.json'

function App() {
  return (
    <Router>
      <Header title="Kartoteka SPD"/>
      <Navbar/>
      <div className='main'>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/kartoteka/:regon" element={<KartotekaDetails/>}/>
        <Route path="/kartoteka/dodaj" element={<AddKartotekaItem/>}/>
        <Route path='/tabela' element={<Tabela data={data}/>}/>
      </Routes>    
      </div>
      <Footer/>
      
    </Router>
  )
}
export default App
