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
  {firma.nazwa_nsk && <h4>Skrócona nazwa: {firma.nazwa_nsk}</h4>}
  
  <hr style={{ margin: '20px 0' }} />

  <div style={{ display: 'flex', gap: '50px', marginBottom: '20px' }}>
    <div>
      <h3>Dane rejestrowe</h3>
      <p>REGON: <strong>{firma.regon}</strong></p>
      <p>NIP: <strong>{firma.nip}</strong></p>
    </div>
    <div>
      <h3>Adresy</h3>
      <p>Siedziba: <strong>{firma.getAdres()}</strong></p>
      <p>Korespondencyjny: <strong>{firma.ulica_s}, {firma.miasto_s}</strong></p>
    </div>
  </div>

  <div style={{ display: 'flex', gap: '50px', marginBottom: '20px' }}>
    <div>
      <h3>Kontakt</h3>
      <p>Telefon: <strong>{firma.telefon || 'Brak'}</strong></p>
      <p>Fax: <strong>{firma.fax || 'Brak'}</strong></p>
      <p>WWW: <strong>{firma.www || 'Brak'}</strong></p>
    </div>
    <div>
      <h3>Adresy e-mail</h3>
      <p>Ogólny: <strong>{firma.email_org || 'Brak'}</strong></p>
      <p>Do OZS: <strong>{firma.email_ozs || 'Brak'}</strong></p>
      <p>Sprawozdania: <strong>{firma.email_spr || 'Brak'}</strong></p>
    </div>
  </div>

  <hr style={{ margin: '20px 0' }} />
  <div style={{ marginBottom: '30px' }}>
    <h3>Informacje dodatkowe</h3>
    <p><strong>Uwagi:</strong> {firma.uwagi || 'Brak uwag'}</p>
    <p><strong>Notatki:</strong> {firma.notatki || 'Brak notatek'}</p>
  </div>
  <Link to="/" className='gohome'>Powrót do listy</Link>
</div>
  )
}

export default KartotekaDetails
