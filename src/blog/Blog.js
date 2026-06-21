import './Blog.css';
import Icon from './Icon.js'
import Window from './Window.js'
import CustomNavbar from '../CustomNavbar.js'
import { v4 as uuidv4 } from 'uuid';
import { useState, useCallback, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import CRTChromaFilter from './CRTChromaFilter.js'
import useKonami from "./useKonami";
import { DESKTOP_FOLDERS, FOLDER_CONFIGS } from "./folders.js";


function Blog() {

  const { folderKey: routeFolderKey, postName: routePostName } = useParams();
  const navigate = useNavigate();

  const [crtOn, setCrtOn] = useState(false);
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);

  const toggleCRT = useCallback(() => setCrtOn(prev => !prev), []);
  useKonami(toggleCRT);

  // Open the folder window (and overlay) requested by the URL on first load only.
  // Captured on mount so later in-app navigation doesn't reopen windows.
  const initialRoute = useRef({ folderKey: routeFolderKey, postName: routePostName });
  useEffect(() => {
    const { folderKey, postName } = initialRoute.current;
    if (!folderKey || !FOLDER_CONFIGS[folderKey]) return;

    const folderConfig = FOLDER_CONFIGS[folderKey];
    const newId = uuidv4();
    setWindows([{
      id: newId,
      title: folderConfig.windowTitle,
      folderKey,
      content: 'Window Content',
      isOpen: true,
      initialPostName: postName || null,
    }]);
    setActiveWindowId(newId);
  }, []);

  const closeWindow = (id) => {
    setWindows(prevWindows =>
      prevWindows.filter(win => win.id !== id)
    );
    navigate('/blog');
  };

  const bringToFront = (id) => {
    setActiveWindowId(id);
  };

  const iconClickedHandler = (folderKey) => {
    const folderConfig = FOLDER_CONFIGS[folderKey];
    if (!folderConfig) return;

    const newWindow = {
      id: uuidv4(),
      title: folderConfig.windowTitle,
      folderKey,
      content: 'Window Content',
      isOpen: true
    };
    setWindows(prevWindows => [...prevWindows, newWindow]);
    navigate(`/me/${folderKey}`);
  }

  const handleOpenPost = useCallback((folderKey, postName) => {
    navigate(`/me/${folderKey}/${postName}`);
  }, [navigate]);

  const handleClosePost = useCallback((folderKey) => {
    navigate(`/me/${folderKey}`);
  }, [navigate]);

  const folderImg = require("./img/folderIcon.png");
  
  return (
    
    <div className="App">
    {crtOn && <CRTChromaFilter />}
    <CustomNavbar />

    <div className="desktop">
      {DESKTOP_FOLDERS.map(folder => (
        <Icon
          key={folder.key}
          onClick={iconClickedHandler}
          boundingSelector=".desktop"
          thumbnail={folderImg}
          name={folder.label}
          value={folder.key}
        />
      ))}
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
            initialPostName={win.initialPostName}
            onOpenPost={handleOpenPost}
            onClosePost={handleClosePost}
          />
        )
      ))}
    </div>

    </div>
  );
}

export default Blog;
