import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import '../index.css';
import '../styles/KartotekaEdit.css';

function Tabela3({ data }) {
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility,setColumnVisibility]=useState({});
    const [isColumnModalOpen,setIsColumnModalOpen]=useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen]=useState(false);
    const [activeFilterCols, setActiveFilterCols] = useState(['regon','nazwa_nsk','miasto','ulica']);
    const [selectedNewFilter, setSelectedNewFilter]=useState('');
    const [isCoordinatorMenuOpen, setIsCoordinatorMenuOpen]=useState(false);
    const menuRef = useRef(null)

    useEffect(()=>{
        function handleClickOutside(event){
            if(menuRef.current && !menuRef.current.contains(event.target)){
                setIsCoordinatorMenuOpen(false);
            }
        }
        document.addEventListener("mousedown",handleClickOutside);
        return ()=>document.removeEventListener("mousedown",handleClickOutside)
    },[menuRef])

    const columns = useMemo(() => [
        {
            id: 'wybor',
            header: 'wybór',
            cell: () => <input type="checkbox" />,
            enableSorting: false,
        },
        { header: 'regon', accessorKey: 'regon' },
        { header: 'status', accessorKey: 'status' },
        { header: 'RA', accessorKey: 'ra' },
        { header: 'Nazwa Skrócona', accessorKey: 'nazwa_nsk' },
        { header: 'Kod', accessorKey: 'kodPocztowy' },
        { header: 'test', accessorKey: 'test' },
        { header: 'Miasto', accessorKey: 'miasto' },
        { header: 'Ulica', accessorKey: 'ulica' },
        { header: 'Telefon kier', accessorKey: 'tl_kier' },
        { header: 'telefon nr', accessorKey: 'telefon' },
        { header: 'Email OZS', accessorKey: 'email_ozs' },
    ], []);

    const table = useReactTable({
        data: data || [],
        columns,
        state: { sorting, globalFilter, columnFilters, columnVisibility },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } }
    });
    const areAllVisible=table.getAllLeafColumns()
        .filter(col=>col.id!=='wybor')
        .every(col=>col.getIsVisible())
    const availableFilterColumns = table.getAllLeafColumns().filter(col=>{
        return col.id !=='wybor' && !activeFilterCols.includes(col.id)
    })
    const handleAddFilter= () => {
        if(selectedNewFilter && !activeFilterCols.includes(selectedNewFilter)){
            setActiveFilterCols([...activeFilterCols, selectedNewFilter])
            setSelectedNewFilter('')
        }
    }
    const handleRemoveFilter = (colId)=>{
        table.getColumn(colId)?.setFilterValue(undefined)
        setActiveFilterCols(activeFilterCols.filter(id=>id!==colId))
    }

    return (
        <div className="formWrapper" style={{ maxWidth: '95%' }}>
            
            <div className="form-div-2" style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px', borderRadius: '5px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', flexGrow: 1 }}>
                    <div>
                        <label>Kartoteka</label><br />
                        <select style={{ minWidth: '100px', width: '100%' }}><option>f01dk_2018_kw1_</option></select>
                    </div>
                    <div>
                        <label>Aktualny status</label><br />
                        <select style={{ minWidth: '100px', width: '100%' }}></select>
                    </div>
                    <div>
                        <label>Statusy historia</label><br />
                        <select style={{ minWidth: '100px', width: '100%' }}></select>
                    </div>
                    <div>
                        <label>Edytował</label><br />
                        <input type="text" style={{ minWidth: '100px', width: '100%' }} />
                    </div>
                    <div>
                        <label>Regon od</label><br />
                        <input type="text" style={{ minWidth: '100px', width: '100%' }} />
                    </div>
                    <div>
                        <label>Regon do</label><br />
                        <input type="text" style={{ minWidth: '100px', width: '100%' }} />
                    </div>
                    <div>
                        <label>Województwo</label><br />
                        <select style={{ minWidth: '100px', width: '100%' }}></select>
                    </div>
                    <div>
                        <label>Symbol RA</label><br />
                        <input type="text" style={{ minWidth: '100px', width: '100%' }} />
                    </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label style={{ color: '#fff' }}><input type="checkbox" /> bez OZS</label>
                    <button type="button">Odśwież</button>
                    <button type="button">Wyczyść</button>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>                
                <div className="filtry" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
                    {activeFilterCols.map(colId=>{
                        const col = table.getColumn(colId);
                        if(!col) return null;
                        const headerName= typeof col.columnDef.header === ' string' ? col.columnDef.header : col.id
                        return( 
                            <label key={colId} style={{display: 'flex', alignItems:'center', gap:'5px', fontWeight:'bold'}}>
                                {headerName}
                                <input style={{ minWidth: '80px', padding: '5px' }} 
                                    value={(col.getFilterValue() || '')}
                                    onChange={e =>col.setFilterValue(e.target.value)}
                                    />
                            </label>
                        )
                    })}
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'10px', paddingBottom:'5px'}}>
                    <button type="button" onClick={()=>setIsFilterModalOpen(true)}>Edytuj filtry</button>
                    <button type="button" onClick={()=>setIsColumnModalOpen(true)}>Edytuj liste wyświetlanych kolumn</button>
                </div>
            </div>
            <div className="coordinator-menu-container" ref={menuRef}>
                <button 
                    type="button" 
                    className={`coordinator-menu-btn ${isCoordinatorMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsCoordinatorMenuOpen(!isCoordinatorMenuOpen)}
                >
                    ustawienia (koordynator) ▾
                </button>

                {isCoordinatorMenuOpen && (
                    <div className="coordinator-dropdown">
                        <ul>
                            <li onClick={() => { setIsFilterModalOpen(true); setIsCoordinatorMenuOpen(false); }}>
                                edytuj listę pól filtrowania danych w tabeli
                            </li>
                            <li onClick={() => { setIsColumnModalOpen(true); setIsCoordinatorMenuOpen(false); }}>
                                edytuj listę kolumn tabeli
                            </li>
                            
                            {/* Opcjonalne dodatkowe pozycje ze zdjęcia */}
                            <li onClick={() => setIsCoordinatorMenuOpen(false)}>
                                przydzielanie jednostek
                            </li>
                            <li onClick={() => setIsCoordinatorMenuOpen(false)}>
                                aktualizacja statusów
                            </li>
                            <li onClick={() => setIsCoordinatorMenuOpen(false)}>
                                definicja migracji danych do kontroli
                            </li>
                            <li onClick={() => setIsCoordinatorMenuOpen(false)}>
                                aktualizuj dane jednostek na podstawie danych w kartotece
                            </li>
                            <li onClick={() => setIsCoordinatorMenuOpen(false)}>
                                ustawienia kartoteki
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            {isColumnModalOpen&&(
            <div className='modal-overlay'>
                <div className="modal-content">
                    <h3>Wyświetlane Kolumny</h3>
                    <div className="column-list">
                        {table.getAllLeafColumns().map(column=>{
                            if(column.id==='wybor')
                                return null
                            return(
                                <label key={column.id}>
                                    <input 
                                        type="checkbox" 
                                        checked={column.getIsVisible()}
                                        onChange={column.getToggleVisibilityHandler()}    
                                    />
                                    {typeof column.columnDef.header==='string'?column.columnDef.header:column.id}
                                </label>
                            )

                        })}
                    </div>
                    <div className="modal-actions">
                        <button
                            type='button'
                            className='btn-secondary'
                            onClick={()=>{
                                table.getAllLeafColumns().forEach(col=>{
                                    if(col.id!=='wybor'){
                                        col.toggleVisibility(!areAllVisible)
                                    }
                                })
                            }}
                        >{areAllVisible? 'Ukryj wszystkie':'Pokaż wszystkie'}</button>
                        <button
                            type="button"
                            className="btn-primary"
                            onClick={()=>setIsColumnModalOpen(false)}
                        >
                            Gotowe
                        </button>
                    </div>
                </div>
            </div>
            )}
            {isFilterModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{maxWidth:'480px'}}>
                        <h3>Aktywne filtry kolumn</h3>
                        <div className="column-list" style={{maxHeight:'45vh'}}>
                            {activeFilterCols.length===0?(
                                <p style={{textAlign:'center',color:'#888',margin:'20px 0'}}>Brak aktywnych pól filtrów. Dodaj filtr poniżej</p>
                            ):(
                                activeFilterCols.map(colId=>{
                                    const col = table.getColumn(colId)
                                    if(!col) return null
                                    const headerName=typeof col.columnDef.header==='string'?col.columnDef.header:col.id
                                    return(
                                        <div key={colId} className="filter-item">
                                            <span style={{fontWeight:'bold', width:'130px',fontSize:'14px'}}>{headerName}</span>
                                            <input 
                                            type="text" 
                                            placeholder={'Filtruj '+String(headerName).toLocaleLowerCase() + '...'} 
                                            value={(col.getFilterValue()||'')}
                                            onChange={e=>col.setFilterValue(e.target.value)}
                                            style={{flex:1,padding:'6px', border:'1px solid #ccc', borderRadius:'4px'}}/>
                                            <button
                                                type='button'
                                                className='btn-remove'
                                                onClick={()=>handleRemoveFilter(colId)}
                                                title="Usuń ten filtr z paska"
                                            >✕</button>
                                        </div>
                                    )
                                })
                            )}

                        </div>
                        <div className="add-filter-row">
                            <select 
                                value={selectedNewFilter}
                                onChange={e=> setSelectedNewFilter(e.target.value)}
                            >
                                <option value="">-- Wybierz kolumnę do dodania --</option>
                                {availableFilterColumns.map(col=>(
                                    <option key={col.id} value={col.id}>
                                        {typeof col.columnDef.header==='string'?col.columnDef.header:col.id}
                                    </option>
                                ))}
                            </select>
                            <button 
                                type="button"
                                className="btn-primary"
                                onClick={handleAddFilter}
                                disabled={!selectedNewFilter}
                                style={{padding:'8px 15px', opacity: selectedNewFilter?1:0.5}}
                            >+ Dodaj</button>
                        </div>
                        <div className="modal-actions" style={{marginTop:'20px'}}>
                            <button 
                                type="button"
                                className='btn-secondary'
                                onClick={()=>{
                                    table.resetColumnFilters();
                                }}
                            >Wyczyść wartości</button>
                            <button
                                type='button'
                                className='btn-primary'
                                onClick={()=>setIsFilterModalOpen(false)}
                            >Gotowe</button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="tabela">
                <table style={{ width: '100%' }}>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{
                                            asc: ' ▲',
                                            desc: ' ▼',
                                        }[header.column.getIsSorted()] ?? ""}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="form-div-4" style={{ marginTop: '20px', alignItems: 'center' }}>
                <div>
                    <strong>Liczba wyfiltrowanych jednostek:</strong> {table.getFilteredRowModel().rows.length}
                </div>
                
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <button type="button" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>|◄◄</button>
                    <button type="button" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>◄</button>
                    
                    <span style={{ margin: '0 10px', fontWeight: 'bold' }}>
                        {table.getState().pagination.pageIndex + 1} / {table.getPageCount() || 1}
                    </span>
                    
                    <button type="button" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>►</button>
                    <button type="button" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>►►|</button>
                    
                    <span style={{ marginLeft: '15px' }}>Liczba wierszy na stronę:</span>
                    <select 
                        style={{ minWidth: '60px', marginLeft: '10px' }}
                        value={table.getState().pagination.pageSize}
                        onChange={e => table.setPageSize(Number(e.target.value))}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '30px' }}>
                <fieldset style={{ border: 'solid 1px #22549655', padding: '15px', borderRadius: '5px', flex: 1 }}>
                    <legend style={{ color: '#225496', fontWeight: 'bold' }}>Wysyłka email</legend>
                    <select style={{ width: '100%', minWidth: 'auto', marginBottom: '10px' }}><option>Wybierz szablon</option></select>
                    <button type="button" style={{ width: '100%', marginBottom: '10px' }}>Wyślij wiadomości email</button>
                    <label><input type="checkbox" /> (.doc) </label>
                    <label><input type="checkbox" /> (.pdf) </label>
                </fieldset>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'center' }}>
                    <button type="button">Eksport zdefiniowanych zbiorów</button>
                    <button type="button">Aktualizuj kartotekę z excela</button>
                    <button type="button">Importuj dane z excela</button>
                </div>

                <fieldset style={{ border: 'solid 1px #22549655', padding: '15px', borderRadius: '5px', flex: 1 }}>
                    <legend style={{ color: '#225496', fontWeight: 'bold' }}>Eksport</legend>
                    <select style={{ width: '100%', minWidth: 'auto', marginBottom: '10px' }}><option>Wybierz format</option></select>
                    <button type="button" style={{ width: '100%' }}>Eksportuj</button>
                </fieldset>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'center' }}>
                    <button type="button">Aktualizuj statusy</button>
                    <button type="button">Edytuj jednostkę</button>
                </div>
            </div>

        </div>
    );
}

export default Tabela3;