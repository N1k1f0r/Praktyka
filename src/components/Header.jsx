import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/header-style.css'
import '../styles/dropdownLogin-style.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useAuth } from '../context/AuthContext';
function Header() {
  const {user,isLoggedIn,logout}=useAuth();
  const [isDropdowOpen, setIsDropDownOpen]=useState(false);
  const navigate=useNavigate()
  const toggleDropdown=()=>{
    if(isLoggedIn){
      setIsDropDownOpen(!isDropdowOpen)
    }
    else{
      navigate('/login')
    }
  }
  const handleAccountClick=()=>{
    if(isLoggedIn)
    return(
      <div style={{position:'absolute'}}>
        <p>{user.firstname} {user.lastname}</p>
        <p>email: {user.email}</p>
        <p>stanowisko: {user.role}</p>
      </div>
    )
  }
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
        <div className='account' onClick={toggleDropdown} style={{position:'relative'}}>
          <AccountCircleIcon/>
            <p>
              {isLoggedIn?'Witaj, '+user.firstname+' '+user.lastname:'Zaloguj'}
            </p>
            {isDropdowOpen&&isLoggedIn&&(
              <div className='dropdownLogin'>
                <p>nazwa: <strong>{user.firstname} {user.lastname}</strong> <span style={{color:'#225496cc'}}>({user.role})</span></p>
                <p>email: <strong>{user.email}</strong></p>
                <p>tel: <strong>{user.phone}</strong></p>
                <p>stanowisko: <strong>{user.position}</strong></p>
                <div style={{textAlign:'center', width:'100%', marginTop:'20px'}}>
                  <button type="button" className='btn-logout' onClick={logout}>Wyloguj</button>
                  <button type="button" >Edytuj dane</button>
                </div>
              </div>
            )}
        </div>

      </div>
    </div>
  )
}

export default Header
