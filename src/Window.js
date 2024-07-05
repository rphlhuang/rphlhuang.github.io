import Draggable from 'react-draggable';
import "./Window.css"

function Window() {
    return(
        <Draggable bounds="parent" defaultPosition={{x: 60, y: 100}}>
            <div className="window">
                <p> This is a window.</p>
            </div>
        </Draggable>
    );
}

export default Window;