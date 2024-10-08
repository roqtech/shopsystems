import React from 'react';

const TwoCols = ({col1Content, col2Content, col3Content}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <div style={{width: '50%', paddingRight: '10px'}}>
                {col1Content}
            </div>
            <div style={{width: '50%'}}>
                {col2Content}
            </div>
        </div>
    );
};

export default TwoCols;