import React from 'react';

const CV = () => {
    return (
        <div style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
            <iframe
                src={`${process.env.PUBLIC_URL}/cv.pdf`}
                title="CV"
                style={{ width: '100%', height: '100%', border: 'none' }}
            />
        </div>
    );
};

export default CV;
