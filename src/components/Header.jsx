import React from 'react'

function Header({title}) {
  return (
    <div style={{innerHeight:"200 px", innerWidth:"100%", backgroundColor:"#114488", color:"#eee", textAlign:"center"}}>
      <h1>{title}</h1>
    </div>
  )
}

export default Header
