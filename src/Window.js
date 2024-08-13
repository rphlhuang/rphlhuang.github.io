import { Rnd } from 'react-rnd';
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

import ImageOverlay from './ImageOverlay.js';
import Icon from "./Icon.js"
import "./Window.css";
import data from "./photos.json"


function Window({id, title, content, onClose, onContainerClick, onContainerDrag, active}) {
    const style = {
        border: "solid 1px #ddd",
        background: "#f0f0f0",
        zIndex: active ? 1000 : 'auto',
        width: '100%',
        height: '100%'
    };


    const [contents, setContents] = useState([]);
    const contentRef = useRef(null);
    const [lockedSize, setLockedSize] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    const closeOverlay = () => {
        setSelectedImage(null);
    };

    useEffect(() => {
        const images = require.context('./img/photos', false, /\.(png|jpe?g|svg)$/);

        const loadImages = () => {
            const newContents = data.img_paths.map((path) => (
                <Icon
                    id={uuidv4()}
                    name={path}
                    thumbnail={images(`./${path}`)}
                    boundingSelector=".desktop"
                    onClick={() => handleImageClick(images(`./${path}`))}
                />
            ));
            console.log(newContents);
            setContents(newContents);
        };

        loadImages();
    }, []); // empty dependency array, only runs once


    useEffect(() => {
        if (contentRef.current && !lockedSize) {
            const { offsetWidth, offsetHeight } = contentRef.current;
            setLockedSize({ width: offsetWidth, height: offsetHeight });
        }
    }, [contents, lockedSize]); // run this effect when contents are loaded AND lockedSize is not set


    return (
        <>
            <Rnd
                style={style} 
                dragHandleClassName='dragbar' 
                minHeight='250px'
                minWidth='350px'
                default={{x:60, y:100, width:650, height:450}}
                onClick={() => onContainerClick(id)}
                onDrag={() => onContainerDrag(id)}
                className='window'
            >
                <div className='dragbar'>
                    <div className='toolbar'>
                        <div className='windowName'>{title}</div>
                        <div className='close' onClick={() => onClose(id)}>×</div>
                    </div>
                </div>

                <div className='contentContainer' ref={contentRef} style={lockedSize ? lockedSize : {}}>
                    {data.text}
                    {contents}
                </div>
            </Rnd>

            <ImageOverlay 
                isVisible={!!selectedImage} 
                imageSrc={selectedImage} 
                onClose={closeOverlay} 
            />
        </>
    );
}





export default Window;