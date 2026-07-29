import React from 'react'
import '../styles/DashBoardCardStyle.css'
import { useNavigate } from 'react-router-dom'

function DashBoardCard({section}) {
    const navigate = useNavigate()
    const handleClick =(itemId)=>{
        console.log('kliknięto w: '+itemId)
        switch(itemId){
            case 'kartoteki':
                navigate('/kartoteki')
                break
            default:
                break

        }
    }
    return (
        <div className='dashboard-card'>
            <div className='dashboard-header'>
                <h3>{section.title}</h3>
            </div>
            <div className='dashboard-main'>
                {section.items.map((item=>
                    <button 
                        key={item.id}
                        className='dashboardItem'
                        onClick={()=>handleClick(item.id)}>
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default DashBoardCard
