import logoR from "./img/logoR.png";
import './App.css';
import Icon from './Icon.js'
import Window from './Window.js'
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

function App() {

  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);

  const closeWindow = (id) => {
    setWindows(prevWindows =>
      prevWindows.filter(win => win.id !== id)
    );
  };
  
  const bringToFront = (id) => {
    setActiveWindowId(id);
  };

  const iconClickedHandler = (name) => {
    const newWindow = {
      id: uuidv4(),
      title: name,
      content: 'Window Content',
      isOpen: true
    };
    setWindows(prevWindows => [...prevWindows, newWindow]);
  }

  const folderImg = require("./img/folderIcon.png");
  
  return (
    <div className="App">
      <div className="navbar">
        <div>
          <img src={logoR} className="logoR" alt="logo"/>
        </div>
        <div className="navbarElem"> <div className="navbarElemText"> blog </div> </div>
        <div className="navbarElem"> <div className="navbarElemText"> portfolio </div> </div>
        <div className="navbarElem"> <div className="navbarElemText"> about </div> </div>
      </div>

    <div className="desktop">
      {/* <Icon onClick={iconClickedHandler} boundingSelector=".desktop" thumbnail={folderImg} name={"photos"}/> */}
      <Icon onClick={iconClickedHandler} boundingSelector=".desktop" thumbnail={folderImg} name={"jrnl"}/>
      <Icon onClick={iconClickedHandler} boundingSelector=".desktop" thumbnail={folderImg} name={"misc"}/>

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
