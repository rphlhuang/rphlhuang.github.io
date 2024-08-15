import { Rnd } from 'react-rnd';
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

import ImageOverlay from './ImageOverlay.js';
import Icon from "./Icon.js"
import "./Window.css";
import index from "./index.json"

function Window({id, title, onClose, onContainerClick, onContainerDrag, active}) {
    const style = {
        border: "solid 1px #ddd",
        background: "#f0f0f0",
        zIndex: active ? 1000 : 'auto',
        width: '100%',
        height: '100%'
    };


    // states
    const [contents, setContents] = useState([]);
    const contentRef = useRef(null);
    const [lockedSize, setLockedSize] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    // overlay handlers
    const handleImageClick = (title) => {
        if (document.getElementById("overlay")) {
            document.getElementById("overlay").classList.remove("animateOut");
        }
        if (document.getElementsByClassName("overlay-text-block")) {
            const textBlocks = document.getElementsByClassName("overlay-text-block");
            for (let i = 0; i < textBlocks.length; i++) {
                textBlocks[i].classList.remove("animateFade");
            }
        }
        setSelectedPost(title);
    };

    const handleAnimationEnd = (e) => {
        if (e.animationName === "slideLeft") {
            setSelectedPost(null);
        }
    }

    const closeOverlay = () => {
        document.getElementsByClassName("overlay")[0].classList.add("animateOut");
        const textBlocks = document.getElementsByClassName("overlay-text-block");
        for (let i = 0; i < textBlocks.length; i++) {
            textBlocks[i].classList.add("animateFade");
        }
    };

    // load images dynamically
    useEffect(() => {
        setContents([]);
        const images = require.context('./img/photos', false, /\.(png|jpe?g|svg)$/);

        const loadImages = () => {
            for (const [title, path] of Object.entries(index)) {
                const newContents = {
                        id: uuidv4(),
                        name: title,
                        thumbnail: images(`./${path}`),
                        boundingSelector: ".desktop",
                        onClick: () => handleImageClick(title)
                };
                setContents(prevContents => [...prevContents, newContents]);
            }
        };
        loadImages();
    }, []); // empty dependency array, only runs once


    // set image size and keep it that way
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
                    {contents.map(content => (
                        <Icon
                            id={content.id}
                            name={content.title}
                            thumbnail={content.thumbnail}
                            boundingSelector={content.boundingSelector}
                            onClick={content.onClick}
                        />
                    ))}
                </div>
            </Rnd>

            <ImageOverlay 
                isVisible={!!selectedPost} // cast to bool
                postName={selectedPost} 
                onClose={closeOverlay} 
                handleAnimationEnd={handleAnimationEnd}
            />
        </>
    );
}





export default Window;