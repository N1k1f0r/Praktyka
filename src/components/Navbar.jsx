import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
        <Link to="/">Home</Link>
        <Link to="/">Kartoteka</Link>
        <Link to="/tabela">Tabela danych</Link>
        <Link to="kartoteka/edytuj">Edycja</Link>
        <Link to="/tabela2">Tabela danych2</Link>
        <Link to="/tabela3">Tabela danych3</Link>
    </div>
  )
}

export default Navbar
