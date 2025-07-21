import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import logoR from "./img/logoR.png";
import "./Blog.css";

function CustomNavbar() {
// eslint-disable-next-line no-unused-vars
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  const onLogoClick = () => {
    setClickCount(c => {
      const next = c + 1;
      if (next === 3) {
        navigate('/blog');
        return 0;
      }
      return next;
    });
  };

    return (
        <div className="navbar">
            <div>
            <img
            src={logoR}
            className="logoR"
            alt="logo"
            draggable={false}
            onClick={onLogoClick}
            style={{ cursor: 'pointer' }}
            />
            </div>



            <div className="navbarElem">
                <div className="navbarElemText">
                    <Link to="/" id="link"> about </Link>
                </div>
            </div>


            <div className="navbarElem">
                <div className="navbarElemText">
                <Link to="/computers" id="link"> engineering </Link>
                </div>
            </div>

            <div className="navbarElem">
                <div className="navbarElemText">
                <Link to="/teaching" id="link"> education </Link>
                </div>
            </div>
{/* 
            <div className="navbarElem">
                <div className="navbarElemText">
                <Link to="/teaching" id="link"> /hardware_education </Link>
                </div>
            </div> */}

            {/* <div className="navbarElem"> 
                <div className="navbarElemText"> 
                    <Link to="/blog" id="link"> blog </Link>
                </div>
            </div> */}

            {/* <div className="navbarElem">
                <div className="navbarElemText">
                <Link to="/music" id="link"> music </Link>
                </div>
            </div> */}

        </div>
    );
}

export default CustomNavbar;
