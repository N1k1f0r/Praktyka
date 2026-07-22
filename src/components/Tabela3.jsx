import React, { useState, useMemo } from 'react';
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

    // Kolumny
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
        state: { sorting, globalFilter, columnFilters },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } }
    });

    return (
        <div className="formWrapper" style={{ maxWidth: '95%' }}>
            
            {/* 1. SEKCJA: Główne filtry i ustawienia (korzysta z .form-div-2) */}
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

            {/* 2. SEKCJA: Szybkie filtry tabelaryczne (korzysta z .filtry) */}
            <div className="filtry" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
                <label>REGON
                    <input style={{ minWidth: '80px', padding: '5px' }} 
                        value={(table.getColumn('regon')?.getFilterValue() || '')}
                        onChange={e => table.getColumn('regon')?.setFilterValue(e.target.value)}
                    />
                </label>
                <label>Nazwa Skrócona
                    <input style={{ minWidth: '120px', padding: '5px' }} 
                        value={(table.getColumn('nazwa_nsk')?.getFilterValue() || '')}
                        onChange={e => table.getColumn('nazwa_nsk')?.setFilterValue(e.target.value)}
                    />
                </label>
                <label>Miasto
                    <input style={{ minWidth: '100px', padding: '5px' }} 
                        value={(table.getColumn('miasto')?.getFilterValue() || '')}
                        onChange={e => table.getColumn('miasto')?.setFilterValue(e.target.value)}
                    />
                </label>
                <label>Ulica
                    <input style={{ minWidth: '100px', padding: '5px' }} 
                        value={(table.getColumn('ulica')?.getFilterValue() || '')}
                        onChange={e => table.getColumn('ulica')?.setFilterValue(e.target.value)}
                    />
                </label>
            </div>

            {/* 3. SEKCJA: Tabela (korzysta z .tabela z index.css) */}
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

            {/* 4. SEKCJA: Paginacja i podsumowanie (korzysta z .form-div-4) */}
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

            {/* 5. SEKCJA: Panel dolny akcji (Eksporty, Emaile, Edycja) */}
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