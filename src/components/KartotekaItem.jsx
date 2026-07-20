import React from 'react'
import {Link} from 'react-router-dom'

function KartotekaItem({dane}) {
  return (
    <Link to={"/kartoteka/"+dane.regon} style={{textDecoration:"none", color:"inherit"}}>
        <div className='card'>
            <p>Regon: {dane.regon}</p>
            <h3>{dane.nazwa}</h3> 
            <p>NIP: {dane.nip}</p>
        </div>
    </Link>
  )
}

export default KartotekaItem
