import React, { useState, useEffect } from "react";
import "./ImageOverlay.css";
import {IMAGE_CONTEXTS, INDEX_MAP} from "./folders.js"

function OverlayTextBlock ({ text }) {
    return (
        <div className="overlay-text-block">{text}</div>
    );
}

function ImageOverlay({ isVisible, postName, folderKey, onClose, handleAnimationEnd }) {    
    // load images, json files dynamically
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        const context = require.context('./posts', false, /\.json$/);
        const data = context.keys().map((key) => {
            return context(key);
        });
        setJsonData(data);
    }, []);

    // load correct post when postName changes
    const [currentPostObject, setCurrentPostObject] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    useEffect(() => {
        // const images = require.context('./img/photos', false, /\.(png|jpe?g|svg)$/);

        if (postName === null) return;
        const foundObject = jsonData.find(post => post.title === postName);

        if (!foundObject) return;

        let images = folderKey ? IMAGE_CONTEXTS[folderKey] : null;
        if (!images) {
        const inferredKey = Object.keys(INDEX_MAP).find(
            (k) => INDEX_MAP[k] && INDEX_MAP[k][postName]
        );
        images = inferredKey ? IMAGE_CONTEXTS[inferredKey] : null;
        }
        if (!images) return;

        setCurrentPostObject(foundObject);
        setImageSrc(images(`./${foundObject.image}`));
        
    }, [postName, jsonData, folderKey])

    // wait until image is loaded before displaying overlay
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (postName === null) {
            return;
        }
        if (imageSrc) {
            const img = new Image();
            img.src = imageSrc;
            console.log(img.src);
            img.onload = () => setIsLoaded(true);
        }
    }, [postName, imageSrc]);

    if (!isVisible || !isLoaded) {
        return null;
    }

    return (
        <div className="overlay" onAnimationEnd={handleAnimationEnd}>
            <div className="overlay-toolbar" onClick={onClose}>⋘</div>
            <div className="overlay-content">
                <div className="overlay-title">{currentPostObject.title}     {currentPostObject.date}</div>
                <img src={imageSrc} alt="Full Resolution"/>
                <div className="overlay-text">
                    {currentPostObject.text.map(paragraph => (
                        <OverlayTextBlock text={paragraph}/>
                    ))}
                </div>
            </div>
        </div>
    );

}

export default ImageOverlay;
