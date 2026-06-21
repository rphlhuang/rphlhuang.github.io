import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import logoR from "./img/logoR.png";
import "./blog/Blog.css";

function CustomNavbar() {
    // eslint-disable-next-line no-unused-vars
    const [clickCount, setClickCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (clickCount === 0) return;

        let timer;
        if (clickCount === 3) {
            navigate('/me');
            setClickCount(0);
        } else if (clickCount === 6) {
            window.open(
                'https://static.wikia.nocookie.net/konamiverse/images/7/70/Konami_Code_-_02.png/revision/latest?cb=20190618022020',
                '_blank'
            );
            setClickCount(0);
        } else {
            timer = setTimeout(() => {
                if (clickCount === 1) {
                    navigate('/');
                }
                setClickCount(0);
            }, 400);
        }

        return () => clearTimeout(timer);
    }, [clickCount, navigate]);

    const onLogoClick = () => {
        setClickCount(c => c + 1);
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
                    <Link to="/cv" id="link"> cv </Link>
                </div>
            </div>

            <div className="navbarElem">
                <div className="navbarElemText">
                    <Link to="/papers" id="link"> papers </Link>
                </div>
            </div>

            <div className="navbarElem">
                <div className="navbarElemText">
                    <Link to="/apps" id="link"> apps </Link>
                </div>
            </div>

            {/* <div className="navbarElem">
                <div className="navbarElemText">
                <Link to="/computers" id="link"> engineering </Link>
                </div>
            </div>

            <div className="navbarElem">
                <div className="navbarElemText">
                <Link to="/teaching" id="link"> education </Link>
                </div>
            </div> */}
            {/* 
            <div className="navbarElem">
                <div className="navbarElemText">
                <Link to="/teaching" id="link"> /hardware_education </Link>
                </div>
            </div> */}

            {/* <div className="navbarElem"> 
                <div className="navbarElemText"> 
                    <Link to="/me" id="link"> blog </Link>
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
