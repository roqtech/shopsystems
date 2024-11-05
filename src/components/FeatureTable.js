import React, { useMemo } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'; // TODO move somewhere else
import data from '/static/data/shopsystems.json';
import PremiumFeatureIcon from './svg/PremiumFeatureIcon';
import FullFeatureIcon from './svg/FullFeatureIcon';
import PartialFeatureIcon from './svg/PartialFeatureIcon';
import NoFeatureIcon from './svg/NoFeatureIcon';

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
                            3: <PremiumFeatureIcon />,
                            2: <FullFeatureIcon />,
                            1: <PartialFeatureIcon />,
                            0: <NoFeatureIcon />,
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
