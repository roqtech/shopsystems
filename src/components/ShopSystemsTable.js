import React, { useMemo } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import data from '/static/data/shopsystems.json';

function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`Search ${count} records...`}
            className="table-filter"
        />
    );
}

export default function ShopSystemTable({ name, license, cols }) {
    const selectedCols = useMemo(
        () => (cols ? cols.split(',').map(c => c.trim()) : []),
        [cols]
    );

    const columns = useMemo(() => {
        const allColumns = {
            'Name': {
                Header: 'Name',
                accessor: 'Name',
                Filter: DefaultColumnFilter,
            },
            'License': {
                Header: 'License',
                accessor: 'License',
                Filter: DefaultColumnFilter,
            },
            'URL': {
                Header: 'URL',
                accessor: 'URL',
                Cell: ({ value }) => (
                    <a href={value} target="_blank" rel="noopener noreferrer">
                        {value}
                    </a>
                ),
            },
            'NameUrl': {
                Header: 'Vendor',
                accessor: row => ({ name: row.Name, url: row.URL }),
                id: 'nameUrl',
                Cell: ({ value }) => (
                    <a href={value.url} target="_blank" rel="noopener noreferrer">
                        🌐
                    </a>
                ),
            },
            'OS license': {
                Header: 'OS license',
                accessor: 'OS license',
            },
            'Repository': {
                Header: 'Repository',
                accessor: 'Repository',
                Cell: ({ value }) => (
                    value ? (
                        <a href={`https://github.com/${value}`} target="_blank" rel="noopener noreferrer">
                            {value}
                        </a>
                    ) : null
                ),
            },
            'Stars': {
                Header: 'Stars',
                accessor: 'Stars',
            },
            'Architecture': {
                Header: 'Architecture',
                accessor: 'Architecture',
            },
            'Code': {
                Header: 'Code',
                accessor: 'Code',
            },
            'Recommended for': {
                Header: 'Recommended for',
                accessor: 'Recommended for',
            },
            'Typical scenarios': {
                Header: 'Typical scenarios',
                accessor: 'Typical scenarios',
                Cell: ({ value }) => {
                    const items = value.split(',');
                    return (
                        <>
                            {items.map((item, index) => (
                                <span key={index} className="badge">{item}</span>
                            ))}
                        </>
                    );
                },
            },
            'Project Hosting': {
                Header: 'Project Hosting',
                accessor: 'Project Hosting',
            },
            'Code-access': {
                Header: 'Code Access',
                accessor: 'Code-access',
            },
            'Security certificates': {
                Header: 'Security Certificates',
                accessor: 'Security certificates',
            },
            'Privacy center': {
                Header: 'Privacy Center',
                accessor: 'Privacy center',
                Cell: ({ value }) => (
                    <a href={value} target="_blank" rel="noopener noreferrer">
                        Privacy Center
                    </a>
                ),
            },
            'Dev docs': {
                Header: 'Dev Docs',
                accessor: 'Dev docs',
                Cell: ({ value }) => (
                    <a href={value} target="_blank" rel="noopener noreferrer">
                        Dev Docs
                    </a>
                ),
            },
        };

        if (selectedCols.length > 0) {
            return selectedCols
                .map(colName => allColumns[colName])
                .filter(Boolean);
        } else {
            return Object.values(allColumns);
        }
    }, [selectedCols]);

    const defaultColumn = useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        []
    );

    const filteredData = useMemo(() => {
        if (license) {
            return data.filter(row => row['License'] === license);
        }
        if (name) {
            return data.filter(row => row['Name'] === name);
        }
        return data;
    }, [license]);

    const tableInstance = useTable(
        { columns, data: filteredData, defaultColumn },
        useFilters,
        useSortBy
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <table {...getTableProps()} className="custom-table">
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className="table-header-row">
                    {headerGroup.headers.map(column => (
                        <th
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            className="table-header-cell"
                        >
                            {column.render('Header')}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} className="table-body-row">
                        {row.cells.map(cell => (
                            <td {...cell.getCellProps()} className="table-body-cell">
                                {cell.render('Cell')}
                            </td>
                        ))}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}