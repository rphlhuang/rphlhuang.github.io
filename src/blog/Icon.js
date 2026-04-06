import Draggable from 'react-draggable';
import { useRef } from 'react';
import "./Icon.css"


function Icon({name, value = name, onClick, thumbnail, boundingSelector}) {
    const lastTapRef = useRef(0);

    const handleOpen = () => {
        onClick(value);
    };

    const handleTouchEnd = (event) => {
        const now = Date.now();
        const tapDelay = now - lastTapRef.current;

        if (tapDelay > 0 && tapDelay < 300) {
            event.preventDefault();
            handleOpen();
        }

        lastTapRef.current = now;
    };

    return(
        <Draggable bounds={boundingSelector} defaultPosition={{x: 0, y: 0}}>
                <div className='iconContainer'>
                    <img
                        draggable="false"
                        src={thumbnail}
                        onDoubleClick={handleOpen}
                        onTouchEnd={handleTouchEnd}
                        className="iconImage"
                        alt="logo"
                    />
                    <div className='iconNameContainer'><div className='iconName'>{name}</div></div>
                </div>
        </Draggable>
        
    );
}

export default Icon;
