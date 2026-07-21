import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
        <Link to="/">Home</Link>
        <Link to="/">Kartoteka</Link>
        <Link to="/tabela">Tabela danych</Link>

    </div>
  )
}

export default Navbar
