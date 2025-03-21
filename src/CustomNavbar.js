import logoR from "./img/logoR.png";
import "./Blog.css";
import { Link } from 'react-router-dom';

function CustomNavbar() {
    return (
        <div className="navbar">
            <div>
            <img src={logoR} className="logoR" alt="logo"/>
            </div>

            {/* <div className="navbarElem"> 
                <div className="navbarElemText"> 
                    <Link to="/blog" id="link"> blog </Link>
                </div>
            </div> */}

            <div className="navbarElem">
                <div className="navbarElemText">
                    <Link to="/" id="link"> about </Link>
                </div>
            </div>


            <div className="navbarElem">
                <div className="navbarElemText">
                <Link to="/computers" id="link"> computers </Link>
                </div>
            </div>

            <div className="navbarElem">
                <div className="navbarElemText">
                <Link to="/teaching" id="link"> teaching </Link>
                </div>
            </div>

            <div className="navbarElem">
                <div className="navbarElemText">
                <Link to="/music" id="link"> music </Link>
                </div>
            </div>

        </div>
    );
}

export default CustomNavbar;
