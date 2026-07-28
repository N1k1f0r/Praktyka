import React from 'react'
import { DataGrid } from '@mui/x-data-grid';


function MUITabela() {
    const rows = [
        { id: 1, name: 'Data Grid', description: 'the Community version' },
        { id: 2, name: 'Data Grid Pro', description: 'the Pro version' },
        { id: 3, name: 'Data Grid Premium', description: 'the Premium version' },
    ];
    const columns = [
        { field: 'name', headerName: 'Product Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 300 },
    ];



  return (
    <div>
      <DataGrid rows={rows} columns={columns}/>
    </div>
  )
}

export default MUITabela
