import React from 'react'
import {useParams} from 'react-router-dom';
function KartotekaDetails() {
    const {regon}=useParams();
  return (
    <div>
      <p>Wyświetlam dane dla firmy o Regonie: {regon}</p>
    </div>
  )
}

export default KartotekaDetails
