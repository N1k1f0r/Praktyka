import React from 'react'

function KartotekaItem({dane}) {
  return (
    <div className='card'>
        <p>Regon: {dane.regon}</p>
        <h3>{dane.nazwa}</h3> 

    </div>
  )
}

export default KartotekaItem
