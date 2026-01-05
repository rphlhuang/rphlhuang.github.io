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
            color: 'black',
            position: 'relative'
        }}>
            <div
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    fontSize: '24px',
                    cursor: 'pointer',
                    zIndex: 100,
                    color: 'black',
                    lineHeight: '1'
                }}
                onClick={() => window.location.href = '/'}
            >
                ⋘
            </div>
            <a
                href={pdfUrl}
                download
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    color: 'black',
                    zIndex: 100,
                    cursor: 'pointer'
                }}
                title="Download CV"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16L12 4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 10L12 16L18 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 20L18 20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </a>
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
