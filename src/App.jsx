import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import KartotekaDetails from './components/KartotekaDetails';

function App() {
  return (
    <Router>
      <Header title="Kartoteka SPD"/>
      <Routes>
        <Main/>  

        <Route path="/" element={<Main/>}/>
        <Route path="/kartoteka/:regon" element={<KartotekaDetails/>}/>
      </Routes>    
      <Footer/>
      
    </Router>
  )
}
export default App
