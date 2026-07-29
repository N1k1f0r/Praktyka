import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from "./components/Header"
import Main from "./pages/Main.jsx"
import Footer from "./components/Footer"
import Navbar from './components/Navbar';
import Tabela4 from './pages/MUITabela.jsx';
import KartotekaDetails from './pages/KartotekaDetails.jsx';
import AddKartotekaItem from './components/AddKartotekaItem';
import KartotekaEdit from './pages/KartotekaEdit.jsx';
import {data} from './data/daneKartotek.js'
import KartotekaList from './pages/KartotekaList.jsx';
import Kartoteki from './pages/Kartoteki.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header/>
        {/* <Navbar/> */}
        <div className='main'>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/kartoteka/:regon" element={<KartotekaDetails/>}/>
          <Route path="/kartoteki" element={<Kartoteki/>}/>
          <Route path="/kartoteka/dodaj" element={<AddKartotekaItem/>}/>
          <Route path="/kartoteka/:regon/edytuj" element={<KartotekaEdit/>}/>
          {/* <Route path='/tabela' element={<Tabela data={data}/>}/> */}
          {/* <Route path='/tabela2' element={<Tabela2 data={data}/>}/> */}
          <Route path='/kartotekaList' element={<KartotekaList data={data}/>}/>
          {/* <Route path='/tabela4' element={<Tabela4 data={data}/>}/> */}
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>    
        </div>
        <Footer/>
        
      </Router>
    </AuthProvider>
  )
}
export default App
