import React, { useMemo } from 'react';
import data from '/static/data/shopsystems.json';

export default function FeatureTable({ name, cols }) {
    const selectedCols = useMemo(
        () => (cols ? cols.split(',').map(c => c.trim()) : []),
        [cols]
    );

    const filteredData = useMemo(() => {
        if (name) {
            return data.filter(row => row['Name'] === name);
        }
        return data;
    }, [name]);

    if (filteredData.length === 0) {
        return <p>No matching data found.</p>;
    }

    const featureKeys = Object.keys(filteredData[0]).filter(
        key => key !== 'Name' && selectedCols.includes(key)
    );

    return (
        <div className="feature-table-container" style={{ fontSize: '13px', width: '100%' }}>
            {filteredData.map((row, rowIndex) => (
                <table key={rowIndex} className="feature-table" style={{ border: '0' }}>
                    <tbody>
                    {featureKeys.map((key, index) => {
                        const status = row[key].Status;
                        const statusText = {
                            2: 'Fully working ootb',
                            1: 'Limited functionality. Requires custom coding',
                            0: 'Feature not included',
                        }[status] || 'Unknown';

                        const statusIcon = {
                            2: <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#22c55e'
                                    viewBox='0 0 16 16'>
                                <circle cx='8' cy='8' r='8'/>
                            </svg>,
                            1: <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>
                                <defs>
                                    <linearGradient id='halfGreenWhite' x1='0%' y1='0%' x2='100%' y2='0%'>
                                        <stop offset='50%' style={{stopColor: '#22c55e'}}/>
                                        <stop offset='50%' style={{stopColor: '#d9f99d'}}/>
                                    </linearGradient>
                                </defs>
                                <circle cx='8' cy='8' r='8' fill='url(#halfGreenWhite)'/>
                            </svg>,
                            0: <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#e5e7eb'
                                    viewBox='0 0 16 16'>
                                <circle cx='8' cy='8' r='8'/>
                            </svg>,
                        }
                            [status] || <span style={{color: 'gray', fontWeight: 'bold'}}>?</span>;

                        const keyContent = (status === 2 || status === 1) ? <b>{key}</b> :
                            <span style={{color: 'gray'}}>{key}</span>;

                        return (
                            <tr key={index} className="table-row" style={{ padding: '6px', border: 0 }} title={statusText}>
                                <td className="table-cell field-name" style={{ padding: '10px', width: '150px', textAlign: 'center' }}>
                                    {statusIcon}
                                </td>
                                <td className="table-row" style={{ padding: '6px', width: '100%' }}>
                                    {row[key].Source ? (
                                        <a href={row[key].Source} target="_blank" rel="noopener noreferrer">
                                            {keyContent}
                                        </a>
                                    ) : (
                                        keyContent
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            ))}
        </div>
    );
}