import Draggable from 'react-draggable';
import folderIcon from "./img/folderIcon.png";
import "./Icon.css"

function Icon() {

    return(
        <Draggable bounds="parent" defaultPosition={{x: 0, y: 100}}>
            <img draggable="false" src={folderIcon} className="tempLogo" alt="logo" />
        </Draggable>
    );
}

export default Icon;