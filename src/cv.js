import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const CV = () => {
    const [numPages, setNumPages] = useState(null);

    React.useEffect(() => {
        // Save original overflow style
        const originalOverflow = document.body.style.overflow;
        // Enable scrolling for CV page
        document.body.style.overflow = 'auto';

        return () => {
            // Restore original overflow style
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const pdfUrl = `${process.env.PUBLIC_URL}/cv.pdf`;
    const targetWidth = 1024; // Static high resolution width

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
            <style>
                {`
                    .react-pdf__Page canvas,
                    .react-pdf__Page .react-pdf__Page__canvas {
                        width: 100% !important;
                        height: auto !important;
                    }
                    .react-pdf__Page {
                        min-width: 100% !important;
                        max-width: 100% !important;
                    }
                `}
            </style>
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
                className="pdf-document"
            >
                {Array.from(new Array(numPages), (el, index) => (
                    <div key={`page_${index + 1}`} style={{ marginBottom: '20px', width: '90%', maxWidth: '800px', margin: '0 auto 20px auto' }}>
                        <Page
                            pageNumber={index + 1}
                            width={targetWidth}
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
