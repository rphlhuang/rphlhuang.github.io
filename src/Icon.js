import Draggable from 'react-draggable';
import "./Icon.css"


function Icon({name, onClick, thumbnail, boundingSelector}) {

    return(
        <Draggable bounds={boundingSelector} defaultPosition={{x: 0, y: 0}}>
                <div className='iconContainer'>
                    <img draggable="false" src={thumbnail} onDoubleClick={() => onClick(name)} className="iconImage" alt="logo"/>
                    <div className='iconNameContainer'><div className='iconName'>{name}</div></div>
                </div>
        </Draggable>
        
    );
}

export default Icon;