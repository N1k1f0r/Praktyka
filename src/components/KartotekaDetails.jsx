import React from 'react'
import {Link, useParams} from 'react-router-dom'
import data from '../szk01_2024_kart_full_data.json'
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
      <h2>{firma.n_pelna}</h2>
      <p>REGON: <strong>{firma.regon}</strong></p>
      <p>NIP: <strong>{firma.nip}</strong></p>
      <p>Adres: <strong>{firma.ad1_s}</strong></p>
      <p>Email: <strong>{firma.e_mail}</strong></p>
      <Link to="/" className='gohome'>Powrót do listy</Link>
  </div>
  )
}

export default KartotekaDetails
