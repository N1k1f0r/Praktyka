import React from 'react'
import menuData from '../data/menuData.json'
import DashBoardCard from '../components/DashBoardCard'
function Dashboard() {
  return (
    <div>
        <div style={{display:'flex', flexWrap:'wrap', gap:'20px', justifyContent:'center', maxWidth:'1500px', margin:'auto'}}>
            {menuData.map((section)=>(
                <DashBoardCard key={section.id} section={section}/>
            ))}
        </div>
    </div>
  )
}

export default Dashboard
