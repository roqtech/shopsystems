import React, { useMemo } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import data from '/static/data/shops.json';

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

export default function CaseStudyTable({ license, cols }) {
    const selectedCols = useMemo(
        () => (cols ? cols.split(',').map(c => c.trim()) : []),
        [cols]
    );

    const columns = useMemo(() => {
        const allColumns = {
            'Company': {
                Header: 'Company',
                accessor: 'Company',
                Filter: DefaultColumnFilter,
            },
            'Shop System': {
                Header: 'Shop System',
                accessor: 'Shop System',
            },
            'Shop URL': {
                Header: 'Shop URL',
                accessor: 'Shop URL',
                Cell: ({ value }) => (
                    <a href={value} target="_blank" rel="noopener noreferrer">
                        {value}
                    </a>
                ),
            },
            'Type': {
                Header: 'Type',
                accessor: 'Type',
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
            'Industry': {
                Header: 'Industry',
                accessor: 'Industry',
            },
            'Company Size': {
                Header: 'Company Size',
                accessor: 'Company Size',
            },
            'Company Briefing': {
                Header: 'Company Briefing',
                accessor: 'Company Briefing',
            },
            'Shop Description': {
                Header: 'Shop Description',
                accessor: 'Shop Description',
            },
            'Source 1': {
                Header: 'Source 1',
                accessor: 'Source 1',
                Cell: ({ value }) =>
                    value ? (
                        <a href={value} target="_blank" rel="noopener noreferrer">
                            Source 1
                        </a>
                    ) : null,
            },
            'Source 2': {
                Header: 'Source 2',
                accessor: 'Source 2',
                Cell: ({ value }) =>
                    value ? (
                        <a href={value} target="_blank" rel="noopener noreferrer">
                            Source 2
                        </a>
                    ) : null,
            },
            'Additional Information': {
                Header: 'Additional Information',
                accessor: 'Additional information',
                Cell: ({ value }) => (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: value.replace(
                                /→ (https?:\/\/[\w\.\-\/]+\/?)/g,
                                '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
                            ),
                        }}
                    />
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
                            {/*<div>*/}
                            {/*    {column.canFilter ? column.render('Filter') : null}*/}
                            {/*</div>*/}
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
