import React from 'react'
import { useState } from 'react'
import {data}from "./daneKartotek"
import KartotekaItem from './KartotekaItem'
import AddKartotekaItem from './AddKartotekaItem'

function KartotekaList() {
  const [pokazPoprawne, setPokazPoprawne] = useState(true);
  const [pokazBledne, setPokazBledne] = useState(true);
  const przefiltrowaneDane = data.filter((item) => {
    const czyPoprawne = item.nip.length <8; 

    if (pokazPoprawne && czyPoprawne) return true;
    if (pokazBledne && !czyPoprawne) return true;
    
    return false;
  });
  
  return (
    <>
      <div className="filtry" style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '15px' }}>
          <input 
            type="checkbox" 
            checked={pokazPoprawne} 
            onChange={(e) => setPokazPoprawne(e.target.checked)} 
          />
          Pokaż poprawne
        </label>
        <br/>
        <label>
          <input 
            type="checkbox" 
            checked={pokazBledne} 
            onChange={(e) => setPokazBledne(e.target.checked)} 
          />
          Pokaż błędne
        </label>
      </div>
      <div className='cardList'>
          {przefiltrowaneDane.map((item)=>(
            <KartotekaItem key={item.regon} dane={item}/>
          ))}
          <AddKartotekaItem/>
      </div>
    </>
  )
}
export default KartotekaList