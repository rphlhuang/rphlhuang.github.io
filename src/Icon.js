import Draggable from 'react-draggable';
import folderIcon from "./img/folderIcon.png";
import "./Icon.css"


function Icon() {
    const rightBound = window.screen.width - 180;
    const bottomBound = window.screen.height - 320;


    return(
        <Draggable bounds={{left:0, right:rightBound, top:0, bottom:bottomBound}} defaultPosition={{x: 0, y: 0}}>
                <img draggable="false" src={folderIcon} className="tempLogo" alt="logo"/>
        </Draggable>
    );
}

export default Icon;