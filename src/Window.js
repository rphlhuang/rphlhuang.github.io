import Draggable from 'react-draggable';
import { Rnd } from 'react-rnd';
import closeImg from './img/close.png'
import "./Window.css";


// function Window() {
//     return(
//         <Draggable bounds="parent" defaultPosition={{x: 60, y: 100}}>
//             {/* <div className='toolbar'></div> */}
//             <div className="window">
//                 <p> This is a window. </p>
//             </div>
//         </Draggable>
//     );
// }




function Window({id, title, content, onClose, onContainerClick, onContainerDrag, active}) {
    const style = {
        border: "solid 1px #ddd",
        background: "#f0f0f0",
        zIndex: active ? 1000 : 'auto'
    };
    return (
        <Rnd
            style={style} 
            dragHandleClassName='dragbar' 
            minHeight='250px'
            minWidth='350px'
            default={{x: 60,y: 100,width: 500,height: 400}}
            onClick={() => onContainerClick(id)}
            onDrag={() => onContainerDrag(id)}
        >

            <div className='dragbar'>
                <div className='toolbar'>
                    <div className='windowName'>{title}</div>
                    <div className='close' onClick={() => onClose(id)}>×</div>
                </div>
            </div>

            <div className='contentContainer'>
                {content}
            </div>

        </Rnd>
    );
}

export default Window;