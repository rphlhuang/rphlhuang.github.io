import logoR from "./img/logoR.png";
import './App.css';
import Icon from './Icon.js'
import Window from './Window.js'
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

function App() {

  // what is this
  // const ref = useRef(null);

  // const [icons, setIcons] = useState([]);
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);

  const onClickHandler = () => {
    const newWindow = {
      id: uuidv4(),
      title: 'New Window',
      content: 'Window Content',
      isOpen: true
    };
    setWindows(prevWindows => [...prevWindows, newWindow]);
  };

  const closeWindow = (id) => {
    setWindows(prevWindows =>
      prevWindows.filter(win => win.id !== id)
    );
  };
  
  const bringToFront = (id) => {
    setActiveWindowId(id);
  };

  
  return (
    <div className="App">
      <div className="topBar">
        <img src={logoR} className="logoR" alt="logo"/>
      </div>

    <div className="desktop">
      <div onDoubleClick={onClickHandler}><Icon/></div>
      <div onDoubleClick={onClickHandler}><Icon/></div>
      <div onDoubleClick={onClickHandler}><Icon/></div>
      {windows.map(win => (
        win.isOpen && (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            content={win.content}
            onClose={closeWindow}
            onContainerClick={bringToFront}
            onContainerDrag={bringToFront}
            active={win.id === activeWindowId}
          />
        )
      ))}
    </div>

    </div>
  );
}

export default App;
