import React from 'react'
import { Link } from 'react-router-dom'

function AddKartotekaItem() {
  return (
    <Link to="/add" className='addCard'>
        <p>+</p>
    </Link>
  )
}

export default AddKartotekaItem
