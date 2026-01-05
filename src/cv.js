import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const CV = () => {
    const [numPages, setNumPages] = useState(null);
    const [width, setWidth] = useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        // Save original overflow style
        const originalOverflow = document.body.style.overflow;
        // Enable scrolling for CV page
        document.body.style.overflow = 'auto';

        return () => {
            window.removeEventListener('resize', handleResize);
            // Restore original overflow style
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const pdfUrl = `${process.env.PUBLIC_URL}/cv.pdf`;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            minHeight: '100vh',
            padding: '20px 0',
            color: 'black'
        }}>
            <div style={{ marginBottom: '20px' }}>
                <a
                    href={pdfUrl}
                    download
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        fontFamily: 'inherit'
                    }}
                >
                    Download CV
                </a>
            </div>

            <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<div style={{ padding: '20px' }}>Loading PDF...</div>}
                error={<div style={{ padding: '20px', color: 'red' }}>Failed to load PDF. <a href={pdfUrl}>Click here to download.</a></div>}
            >
                {Array.from(new Array(numPages), (el, index) => (
                    <div key={`page_${index + 1}`} style={{ marginBottom: '20px' }}>
                        <Page
                            pageNumber={index + 1}
                            width={Math.min(width * 0.9, 800)}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </div>
                ))}
            </Document>
        </div>
    );
};

export default CV;
