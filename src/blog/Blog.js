import './Blog.css';
import Icon from './Icon.js'
import Window from './Window.js'
import CustomNavbar from '../CustomNavbar.js'
import { v4 as uuidv4 } from 'uuid';
import { useState, useCallback } from "react";
import CRTChromaFilter from './CRTChromaFilter.js'
import useKonami from "./useKonami";


function Blog() {

  const [crtOn, setCrtOn] = useState(false);
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);

  const toggleCRT = useCallback(() => setCrtOn(prev => !prev), []);
  useKonami(toggleCRT);

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
      folderKey: name,
      content: 'Window Content',
      isOpen: true
    };
    setWindows(prevWindows => [...prevWindows, newWindow]);
  }

  const folderImg = require("./img/folderIcon.png");
  
  return (
    
    <div className="App">
    {crtOn && <CRTChromaFilter />}
    <CustomNavbar />

    <div className="desktop">
      <Icon onClick={iconClickedHandler} boundingSelector=".desktop" thumbnail={folderImg} name="jrnl"/>
      <Icon onClick={iconClickedHandler} boundingSelector=".desktop" thumbnail={folderImg} name="music"/>
      <Icon onClick={iconClickedHandler} boundingSelector=".desktop" thumbnail={folderImg} name="etc"/>
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
            folderKey={win.folderKey}
          />
        )
      ))}
    </div>

    </div>
  );
}

export default Blog;
