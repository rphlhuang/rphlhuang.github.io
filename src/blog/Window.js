import { Rnd } from 'react-rnd';
import { useState, useEffect, useRef, useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';

import ImageOverlay from './ImageOverlay.js';
import MusicOverlay from './MusicOverlay.js';
import Icon from "./Icon.js"
import "./Window.css";
import {FOLDER_CONFIGS, IMAGE_CONTEXTS, INDEX_MAP} from "./folders.js"

function getDefaultWindowSize() {
    if (typeof window === "undefined") {
        return {
            x: 60,
            y: 100,
            width: 650,
            height: 450,
            maxWidth: 650,
            maxHeight: 450,
            minWidth: 350,
            minHeight: 250,
        };
    }

    const maxWidth = Math.floor(window.innerWidth * 0.8);
    const maxHeight = Math.floor(window.innerHeight * 0.8);
    const width = Math.min(650, maxWidth);
    const height = Math.min(450, maxHeight);

    return {
        x: Math.min(60, Math.max(0, window.innerWidth - width)),
        y: Math.min(100, Math.max(0, window.innerHeight - height)),
        width,
        height,
        maxWidth,
        maxHeight,
        minWidth: Math.min(350, maxWidth),
        minHeight: Math.min(250, maxHeight),
    };
}

function Window({id, title, folderKey, onClose, onContainerClick, onContainerDrag, active}) {
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
    const [overlayType, setOverlayType] = useState(null);
    const defaultWindowSize = getDefaultWindowSize();

    const handleClose = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose(id);
    }, [id, onClose]);

    // overlay handlers
    const handleImageClick = useCallback((title) => {
        if (document.getElementById("overlay")) {
            document.getElementById("overlay").classList.remove("animateOut");
        }

        if (FOLDER_CONFIGS[folderKey]?.overlayType === 'music') {
            setOverlayType('music');
        } else {
            setOverlayType('image');
            if (document.getElementsByClassName("overlay-text-block")) {
                const textBlocks = document.getElementsByClassName("overlay-text-block");
                for (let i = 0; i < textBlocks.length; i++) {
                    textBlocks[i].classList.remove("animateFade");
                }
            }
        }
        
        setSelectedPost(title);
    }, [folderKey]);

    const handleAnimationEnd = (e) => {
        if (e.animationName === "slideLeft") {
            setSelectedPost(null);
            setOverlayType(null);
        }
    }

    const closeOverlay = () => {
        document.getElementsByClassName("overlay")[0].classList.add("animateOut");
        const textBlocks = document.getElementsByClassName("overlay-text-block");
        for (let i = 0; i < textBlocks.length; i++) {
            textBlocks[i].classList.add("animateFade");
        }
    };

    useEffect(() => {
        const ctx = IMAGE_CONTEXTS[folderKey];
        const idx = INDEX_MAP[folderKey];
        if (!ctx || !idx) return;

        const entries = Object.entries(idx);
        setContents(entries.map(([name, file]) => ({
            id: uuidv4(),
            name,
            thumbnail: ctx(`./${file}`),
            boundingSelector: '.desktop',
            onClick: () => handleImageClick(name),
        })));
    }, [folderKey, handleImageClick]);



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
                cancel='.close'
                minHeight={defaultWindowSize.minHeight}
                minWidth={defaultWindowSize.minWidth}
                maxWidth={defaultWindowSize.maxWidth}
                maxHeight={defaultWindowSize.maxHeight}
                default={defaultWindowSize}
                onClick={() => onContainerClick(id)}
                onDrag={() => onContainerDrag(id)}
                className='window'
            >
                <div className='dragbar'>
                    <div className='toolbar'>
                        <div className='windowName'>{title}</div>
                        <button
                            type='button'
                            className='close'
                            aria-label={`Close ${title}`}
                            onClick={handleClose}
                            onPointerDown={(e) => e.stopPropagation()}
                            onTouchEnd={handleClose}
                        >
                            ×
                        </button>
                    </div>
                </div>

                <div className='contentContainer' ref={contentRef} style={lockedSize ? lockedSize : {}}>
                    {contents.map(content => (
                        <Icon
                            id={content.id}
                            name={content.name}
                            thumbnail={content.thumbnail}
                            boundingSelector={content.boundingSelector}
                            onClick={content.onClick}
                        />
                    ))}
                </div>
            </Rnd>

            {overlayType === 'image' && (
                <ImageOverlay 
                    isVisible={!!selectedPost}
                    postName={selectedPost} 
                    onClose={closeOverlay} 
                    handleAnimationEnd={handleAnimationEnd}
                    folderKey={folderKey}
                />
            )}

            {overlayType === 'music' && (
                <MusicOverlay 
                    isVisible={!!selectedPost}
                    postName={selectedPost} 
                    onClose={closeOverlay} 
                    handleAnimationEnd={handleAnimationEnd}
                    folderKey={folderKey}
                />
            )}
        </>
    );
}


export default Window;
