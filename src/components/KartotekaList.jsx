import React from 'react'
import data from "../szk01_2024_kart_full_data.json"
import KartotekaItem from './KartotekaItem'

function KartotekaList() {
    
  return (
    <div className='cardList'>
        {data.map((item)=>(
          <KartotekaItem key={item.regon} dane={item}/>
        ))}
    </div>
  )
}
export default KartotekaList