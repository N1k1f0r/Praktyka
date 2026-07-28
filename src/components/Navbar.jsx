import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
        <Link to="/">Home</Link>
        {/* <Link to="/tabela">Tabela danych</Link>
        <Link to="/tabela2">Tabela danych2</Link> */}
        <Link to="/kartotekaList">Lista Kartotek</Link>
        <Link to="/kartoteki">Kartoteki</Link>
        {/* <Link to="/tabela4">Tabela danych MUI</Link> */}
    </div>
  )
}

export default Navbar
