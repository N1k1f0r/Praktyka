import React, { useState, useMemo } from 'react';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';

function ColumnFilter({ column, table }) {
    const columnFilterValue = column.getFilterValue();

    const uniqueValues = useMemo(() => {
        const values = new Set();
        table.getPreFilteredRowModel().flatRows.forEach(row => {
            const value = row.getValue(column.id);
            if (value !== undefined && value !== null) {
                values.add(String(value));
            }
        });
        return Array.from(values).sort();
    }, [column.id, table.getPreFilteredRowModel()]);

    const isSelect = column.id === 'miasto' || column.id === 'miasto_s' || column.id === 'status';

    if (isSelect) {
        return (
            <select
                value={(columnFilterValue ?? '')}
                onChange={e => column.setFilterValue(e.target.value || undefined)}
                onClick={e => e.stopPropagation()}
                style={{ width: '100%', padding: '4px', marginTop: '8px', fontWeight: 'normal', borderRadius: '4px' }}
            >
                <option value="">Wszystkie</option>
                {uniqueValues.map(val => (
                    <option key={val} value={val}>{val}</option>
                ))}
            </select>
        );
    }

    return (
        <input
            type="text"
            value={(columnFilterValue ?? '')}
            onChange={e => column.setFilterValue(e.target.value)}
            onClick={e => e.stopPropagation()}
            placeholder="Szukaj..."
            style={{ width: '100%', padding: '4px', marginTop: '8px', fontWeight: 'normal', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
        />
    );
}

function Tabela({ data, maxRows, maxColumns }) {
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState([]);
    const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false); // Stan dla rozwijanego menu kolumn

    const baseColumns = useMemo(() => {
        if (!data || data.length === 0) return [];
        const allKeys = Object.keys(data[0]);
        const keysToDisplay = maxColumns ? allKeys.slice(0, maxColumns) : allKeys;

        return keysToDisplay.map(key => ({
            header: key,
            accessorKey: key,
            filterFn: (key === 'miasto' || key === 'miasto_s') ? 'equalsString' : 'includesString',
        }));
    }, [data, maxColumns]);

    const [columnVisibility, setColumnVisibility] = useState({});

    const initialData = useMemo(() => {
        return maxRows ? data.slice(0, maxRows) : data;
    }, [data, maxRows]);

    const table = useReactTable({
        data: initialData,
        columns: baseColumns,
        state: {
            sorting,
            globalFilter,
            columnFilters,
            columnVisibility,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    if (!data || data.length === 0) {
        return <p>Brak danych</p>;
    }

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'end', marginBottom: '5px' }}>
                <button
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    style={{ padding: '6px 12px', cursor: table.getCanPreviousPage() ? 'pointer' : 'not-allowed', opacity: !table.getCanPreviousPage() ? 0.5 : 1, borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    {'<<'}
                </button>
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    style={{ padding: '6px 12px', cursor: table.getCanPreviousPage() ? 'pointer' : 'not-allowed', opacity: !table.getCanPreviousPage() ? 0.5 : 1, borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    {'< Poprzednia'}
                </button>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    style={{ padding: '6px 12px', cursor: table.getCanNextPage() ? 'pointer' : 'not-allowed', opacity: !table.getCanNextPage() ? 0.5 : 1, borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    {'Następna >'}
                </button>
                <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    style={{ padding: '6px 12px', cursor: table.getCanNextPage() ? 'pointer' : 'not-allowed', opacity: !table.getCanNextPage() ? 0.5 : 1, borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    {'>>'}
                </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px', flexWrap: 'wrap', gap: '15px' }}>

                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setIsColumnDropdownOpen(!isColumnDropdownOpen)}
                        style={{
                            padding: '8px 12px',
                            background: '#225496',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            boxShadow: '2px 2px 5px #8883'
                        }}
                    >
                        Wybierz kolumny {isColumnDropdownOpen ? '▲' : '▼'}
                    </button>

                    {isColumnDropdownOpen && (
                        <div style={{
                            position: 'absolute',
                            top: '110%',
                            left: 0,
                            zIndex: 100,
                            background: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            padding: '10px',
                            boxShadow: '5px 5px 15px rgba(0,0,0,0.2)',
                            minWidth: '200px',
                            maxHeight: '250px',
                            overflowY: 'auto', // Scroll dla listy
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        }}>
                            <label style={{ cursor: 'pointer', fontWeight: 'bold', borderBottom: '1px solid #eee', paddingBottom: '6px' }}>
                                <input
                                    type="checkbox"
                                    checked={table.getIsAllColumnsVisible()}
                                    onChange={table.getToggleAllColumnsVisibilityHandler()}
                                    style={{ marginRight: '8px' }}
                                />
                                Zaznacz wszystkie
                            </label>
                            {table.getAllLeafColumns().map(column => {
                                return (
                                    <label key={column.id} style={{ cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={column.getIsVisible()}
                                            onChange={column.getToggleVisibilityHandler()}
                                            style={{ marginRight: '8px' }}
                                        />
                                        {column.id}
                                    </label>
                                );
                            })}
                        </div>
                    )}
                </div>
                <div className="filtry">
                    <label>
                        <strong>Szukaj ogólnie:</strong>
                        <input
                            value={globalFilter ?? ''}
                            onChange={e => setGlobalFilter(e.target.value)}
                            placeholder="Wpisz frazę..."
                            style={{ padding: '7px', borderRadius: '5px', border: '1px solid #ccc', marginLeft: '10px' }}
                        />
                    </label>
                </div>

                <div>
                    <label style={{ marginRight: '10px' }}>
                        <strong>Rekordów na stronę:</strong>
                    </label>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value));
                        }}
                        style={{ padding: '7px', borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                        {[5, 10, 20, 50, 100].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Pokaż {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            

            <div className="tabela">
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} style={{ verticalAlign: 'top' }}>
                                        <div
                                            onClick={header.column.getToggleSortingHandler()}
                                            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                        >
                                            <span>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </span>
                                            <span style={{ fontSize: '0.8em', marginLeft: '5px' }}>
                                                {{
                                                    asc: ' ▲',
                                                    desc: ' ▼',
                                                }[header.column.getIsSorted()] ?? ""}
                                            </span>
                                        </div>

                                        {header.column.getCanFilter() ? (
                                            <div>
                                                <ColumnFilter column={header.column} table={table} />
                                            </div>
                                        ) : null}
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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', padding: '10px 0' }}>
                <div style={{ fontSize: '16px' }}>
                    <p>Strona <strong>{table.getState().pagination.pageIndex + 1}</strong> z <strong>{table.getPageCount() || 1}</strong></p>
                    <p>Wyświetlane wiersze: {table.getRowModel().rows.length} / {initialData.length} (Wszystkich w bazie: {data.length})</p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        style={{ padding: '6px 12px', cursor: table.getCanPreviousPage() ? 'pointer' : 'not-allowed', opacity: !table.getCanPreviousPage() ? 0.5 : 1, borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                        {'<<'}
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        style={{ padding: '6px 12px', cursor: table.getCanPreviousPage() ? 'pointer' : 'not-allowed', opacity: !table.getCanPreviousPage() ? 0.5 : 1, borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                        {'< Poprzednia'}
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        style={{ padding: '6px 12px', cursor: table.getCanNextPage() ? 'pointer' : 'not-allowed', opacity: !table.getCanNextPage() ? 0.5 : 1, borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                        {'Następna >'}
                    </button>
                    <button
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        style={{ padding: '6px 12px', cursor: table.getCanNextPage() ? 'pointer' : 'not-allowed', opacity: !table.getCanNextPage() ? 0.5 : 1, borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                        {'>>'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Tabela;