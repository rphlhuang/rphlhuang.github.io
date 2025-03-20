import './Blog.css';
import Icon from './Icon.js'
import Window from './Window.js'
import CustomNavbar from './CustomNavbar.js'
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

function Blog() {

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
    <CustomNavbar />

    <div className="desktop">
      <Icon onClick={iconClickedHandler} boundingSelector=".desktop" thumbnail={folderImg} name={"jrnl"}/>
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

export default Blog;
