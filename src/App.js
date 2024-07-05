import logoR from "./img/logoR.png";
import './App.css';
import Icon from './Icon.js'
import Window from './Window.js'
import { useState, useRef } from "react";

function App() {

  // what is this
  const ref = useRef(null);

  const [icons, setIcons] = useState([]);
  const [windows, setWindows] = useState([]);

  const onClickHandler = () => {
    console.log('clicked');
    setWindows(windows.concat(<Window/>))
  };

  
  return (
    <div className="App">
      <div className="topBar">
        <img src={logoR} className="logoR" alt="logo"/>
      </div>

    <div className="desktop">
      <div onDoubleClick={onClickHandler}><Icon/></div>
      {windows}
    </div>

    </div>
  );
}

export default App;
