import React from 'react';

const ThreeCols = ({ col1Content, col2Content, col3Content }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '50%' }}>
                {col1Content}
            </div>
            <div style={{ width: '50%' }}>
                {col2Content}
            </div>
            <div style={{ width: '50%' }}>
                {col3Content}
            </div>
        </div>
    );
};

export default ThreeCols;