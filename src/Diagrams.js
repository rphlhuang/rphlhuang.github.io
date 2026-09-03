import React, { useState, useEffect } from 'react';
import CustomNavbar from './CustomNavbar';
import Draggable from 'react-draggable';
import './Diagrams.css';

// Dynamically import all images from the diagrams directory
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('./blog/img/diagrams', false, /\.(png|jpe?g|svg)$/));

function Diagrams() {
    const [maxZIndex, setMaxZIndex] = useState(1);
    const [initialStates, setInitialStates] = useState([]);
    const [zIndices, setZIndices] = useState([]);

    useEffect(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        
        const states = images.map((img) => {
            // Keep photos reasonably within the viewport initially
            const randomX = Math.max(20, Math.random() * (w - 380));
            const randomY = Math.max(80, Math.random() * (h - 450));
            // Random tilt between -25 and +25 degrees
            const randomRotation = (Math.random() - 0.5) * 50; 
            
            return {
                src: img,
                x: randomX,
                y: randomY,
                rotation: randomRotation,
            };
        });
        
        setInitialStates(states);
        setZIndices(images.map(() => 1));
    }, []);

    const bringToFront = (index) => {
        const newZIndex = maxZIndex + 1;
        setMaxZIndex(newZIndex);
        setZIndices(prev => {
            const next = [...prev];
            next[index] = newZIndex;
            return next;
        });
    };

    return (
        <div className="App diagrams-page">
            <CustomNavbar />
            <div className="diagrams-container">
                {initialStates.map((state, index) => (
                    <Draggable 
                        key={index} 
                        onMouseDown={() => bringToFront(index)}
                        defaultPosition={{x: state.x, y: state.y}}
                    >
                        <div style={{ position: 'absolute', zIndex: zIndices[index] }}>
                            <div 
                                className="diagram-photo"
                                style={{ transform: `rotate(${state.rotation}deg)` }}
                            >
                                <img src={state.src} alt={`Diagram ${index}`} draggable={false} />
                            </div>
                        </div>
                    </Draggable>
                ))}
            </div>
        </div>
    );
}

export default Diagrams;
