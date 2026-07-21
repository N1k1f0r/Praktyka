import React,{useState, useMemo} from 'react'

function Tabela({data, maxRows, maxColumns}) {
    const [sortConfig, setSortConfig]= useState({key:null, direction:'asc'})
    if(!data||data.length==0){
        return <p>Brak danych</p>
    }
    const allColoumns=Object.keys(data[0])
    const displayColoumns=maxColumns?allColoumns.slice(0,maxColumns): allColoumns

    const sortedData=useMemo(()=>{
        let sortableItems=[...data];
        if(sortConfig!==null){
            sortableItems.sort((a,b)=>{
                const aValue=a[sortConfig.key]
                const bValue=b[sortConfig.key]

                if(aValue===null) return 1
                if(bValue===null) return -1

                if(aValue<bValue) return sortConfig.direction==='asc'?-1:1
                if(aValue>bValue) return sortConfig.direction==='asc'?1:-1
                return 0

            })
        }
        return sortableItems;
    },[data,sortConfig])
    
    
    const displayRows=maxRows?sortedData.slice(0,maxRows):sortedData;

    const requestSort = (key)=> {
        let direction="asc"
        if(sortConfig.key===key&&sortConfig.direction==="asc"){
            direction="desc"
        }
        setSortConfig({key,direction})
    }

     return (
        <>
        <div className="tabela">
            <table>
                <tr>
                    {displayColoumns.map((colName,index)=>(
                        <th key={index} onClick={()=>requestSort(colName)}>
                            {colName}
                            {sortConfig.key === colName ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : <span style={{ visibility: 'hidden' }}> ▲</span>}
                        </th>
                    ))}
                </tr> 
                {displayRows.map((row,rowIndex)=>(
                    <tr key={rowIndex}>
                        {displayColoumns.map((colName,index)=>(
                            <td key={index}>
                                {row[colName]!==null?String(row[colName]):'-'}
                            </td>
                        ))}
                    </tr>
                ))}
                
            </table>
            
        </div>
        <div style={{padding:'10px'}}>
            <p>Liczba rekordów: {displayRows.length}/{data.length}</p>
            <p>Liczba kolumn: {displayColoumns.length}</p>
        </div>
        </>
    )
}

export default Tabela
