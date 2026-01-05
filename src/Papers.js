import React from 'react';
import CustomNavbar from './CustomNavbar';
import "./Education.css"; // Re-using Education css for consistent styling
import papersData from './papers.json';

function Papers() {
    return (
        <div className="App">
            <CustomNavbar />
            <div className="main-container-edu" style={{ paddingTop: '80px', paddingLeft: '10vw', paddingRight: '10vw' }}>
                <div className="content-overlay" style={{ position: 'relative', width: '100%', textAlign: 'left' }}>
                    <h1>Technical Reports</h1>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {papersData.map((paper, index) => (
                            <li key={index} style={{ marginBottom: '30px' }}>
                                <a
                                    href={`/${paper.fileName}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ fontSize: '1.5rem', color: 'black', textDecoration: 'none', fontWeight: 'bold' }}
                                    onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                                    onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                                >
                                    {paper.title}
                                </a>
                                <div style={{ fontSize: '1rem', fontStyle: 'italic', color: '#555', marginTop: '5px' }}>
                                    {paper.authors} ({paper.year})
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Papers;
