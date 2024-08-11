import Draggable from 'react-draggable';
import folderIcon from "./img/folderIconCopy.png";
import "./Icon.css"


function Icon({name, onClick, thumbnail}) {

    return(
        <Draggable bounds="parent" defaultPosition={{x: 0, y: 0}}>
                <div className='iconContainer'>
                    {/* <img draggable="false" src={folderIcon} onDoubleClick={() => onClick(name)} className="tempLogo" alt="logo"/> */}
                    <img draggable="false" src={thumbnail} onDoubleClick={() => onClick(name)} className="tempLogo" alt="logo"/>
                    <div className='iconNameContainer'><div className='iconName'>{name}</div></div>
                </div>
        </Draggable>
    );
}

export default Icon;