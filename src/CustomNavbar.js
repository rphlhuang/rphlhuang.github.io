import logoR from "./img/logoR.png";
import "./Blog.css";
import { Link } from 'react-router-dom';

function CustomNavbar() {
    return (
        <div className="navbar">
            <div>
            <img src={logoR} className="logoR" alt="logo"/>
            </div>

            <div className="navbarElem"> 
                <div className="navbarElemText"> 
                    <Link to="/blog" id="link"> blog </Link>
                </div>
            </div>

            <div className="navbarElem">
                <div className="navbarElemText">
                <Link to="/portfolio" id="link"> portfolio </Link>
                </div>
            </div>

            <div className="navbarElem">
                <div className="navbarElemText">
                    <Link to="/" id="link"> about </Link>
                </div>
            </div>

        </div>
    );
}

export default CustomNavbar;
