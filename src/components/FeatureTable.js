import React, { useMemo } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'; // TODO move somewhere else
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

    // Ensure featureKeys are ordered as per the `cols` prop
    const featureKeys = selectedCols.filter(key => filteredData[0].hasOwnProperty(key));

    return (
        <div className="feature-table-container" style={{fontSize: '13px', width: '100%'}}>
            {filteredData.map((row, rowIndex) => (
                <table key={rowIndex} className="feature-table" style={{border: '0'}}>
                    <tbody>
                    {featureKeys.map((key, index) => {
                        const status = row[key].Status;
                        const statusText = {
                            2: 'Fully working ootb',
                            1: 'Limited functionality. Requires custom coding',
                            0: 'Feature not included',
                        }[status] || 'Unknown';

                        const statusIcon = {
                            3: <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>
                                <circle cx='8' cy='8' r='7' fill='none' stroke='#22c55e' strokeWidth='2'/>
                                <circle cx='8' cy='8' r='4' fill='#22c55e'/>
                                <line x1='8' y1='0' x2='8' y2='3' stroke='#22c55e' strokeWidth='1'/>
                                <line x1='8' y1='13' x2='8' y2='16' stroke='#22c55e' strokeWidth='1'/>
                                <line x1='0' y1='8' x2='3' y2='8' stroke='#22c55e' strokeWidth='1'/>
                                <line x1='13' y1='8' x2='16' y2='8' stroke='#22c55e' strokeWidth='1'/>
                                <line x1='2' y1='2' x2='4' y2='4' stroke='#22c55e' strokeWidth='1'/>
                                <line x1='12' y1='2' x2='14' y2='4' stroke='#22c55e' strokeWidth='1'/>
                                <line x1='2' y1='12' x2='4' y2='14' stroke='#22c55e' strokeWidth='1'/>
                                <line x1='12' y1='12' x2='14' y2='14' stroke='#22c55e' strokeWidth='1'/>
                            </svg>,
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
                        }[status] || <span style={{color: 'gray', fontWeight: 'bold'}}>?</span>;

                        const keyContent = (status === 2 || status === 1) ? <b>{key}</b> :
                            <span style={{color: 'gray'}}>{key}</span>;

                        return (
                            <tr key={index} className="table-row" style={{padding: '6px', border: 0}}
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={statusText}
                                data-tooltip-place="top">
                                <td className="table-cell field-name"
                                    style={{padding: '10px', width: '150px', textAlign: 'center'}}>
                                    {statusIcon}
                                    <Tooltip id="my-tooltip"/>
                                </td>
                                <td className="table-row" style={{padding: '6px', width: '100%'}}>
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
