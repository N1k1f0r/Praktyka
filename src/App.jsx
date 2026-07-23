import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from "./components/Header"
import Main from "./pages/Main.jsx"
import Footer from "./components/Footer"
import Navbar from './components/Navbar';
import Tabela from './components/Tabela.jsx';
import Tabela2 from './components/Tabela2.jsx';
import Tabela3 from './pages/Tabela3.jsx';
import KartotekaDetails from './pages/KartotekaDetails.jsx';
import AddKartotekaItem from './components/AddKartotekaItem';
import KartotekaEdit from './pages/KartotekaEdit.jsx';
import {data} from './data/daneKartotek.js'

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
        <Route path="/kartoteka/:regon/edytuj" element={<KartotekaEdit/>}/>
        <Route path='/tabela' element={<Tabela data={data}/>}/>
        <Route path='/tabela2' element={<Tabela2 data={data}/>}/>
        <Route path='/tabela3' element={<Tabela3 data={data}/>}/>
      </Routes>    
      </div>
      <Footer/>
      
    </Router>
  )
}
export default App
