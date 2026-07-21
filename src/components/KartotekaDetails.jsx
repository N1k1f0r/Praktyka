import React from 'react'
import {Link, useParams} from 'react-router-dom'
import {data} from './daneKartotek.js';
function KartotekaDetails() {
  const {regon}=useParams()
  const firma=data.find((item)=>item.regon===regon)
  if(!firma){
    return (
      <div className='main'>
        <h2>Nie znaleziono kartoteki</h2>
        <Link to="/" className='gohome'>Powrtót do listy</Link>
      </div>
    )
  }
  return (
  <div>
      <h2>{firma.nazwa_nk}</h2>
      <p>REGON: <strong>{firma.regon}</strong></p>
      <p>NIP: <strong>{firma.nip}</strong></p>
      <p>Adres: <strong>{firma.getAdres()}</strong></p>
      <p>Email: <strong>{firma.email}</strong></p>
      <Link to="/" className='gohome'>Powrót do listy</Link>
  </div>
  )
}

export default KartotekaDetails
