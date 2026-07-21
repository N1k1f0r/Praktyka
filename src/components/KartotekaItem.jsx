import React from 'react'
import {Link} from 'react-router-dom'

function KartotekaItem({dane}) {
  let status="poprawne"
  if(String(dane.nip).length<8)
    status="bledne"
  return (
    <Link to={"/kartoteka/"+dane.regon} style={{textDecoration:"none", color:"inherit"}}>
      
        <div className={`card ${status}`}>
            <p>Regon: {dane.regon}</p>
            <h3>{dane.nazwa_nk}</h3> 
            <p>{dane.getAdres()}</p>
        </div>
    </Link>
  )
}

export default KartotekaItem
