import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/header-style.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useAuth } from '../context/AuthContext';
function Header() {
  const {user,isLoggedIn,logout}=useAuth();
  return (
    <div className='header'>
      <div style={{width:'240px'}}></div>
      <div>
        <h1>SPD+</h1>
        <p>system przetwarzania danych</p>
      </div>
      <div className='menu'>
        <Link to="/">
          <HomeIcon/>
          <p>Home</p>
        </Link>
        <div className='account'>
          <AccountCircleIcon/>
            <p>
              {isLoggedIn?'Witaj, '+user.firstname+' '+user.lastname:'Zaloguj'}
            </p>
        </div>
      </div>
    </div>
  )
}

export default Header
