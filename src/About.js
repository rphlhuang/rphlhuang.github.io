import "./Blog.css"
import "./About.css"
import CustomNavbar from './CustomNavbar.js'
import email from "./img/email.png";
import github from "./img/github.png";
import linkedin from "./img/linkedin.png";


function About() {
  return (
    <div className="App">
        <CustomNavbar />

        <div className="main-container">

            <div className="intro-row">
                <div className="left-col">
                    <h1 className="name">Raphael Huang</h1>
                </div>
                <div className="right-col">
                    <i className="title"><b>Computer Engineering Undergrad at UC Santa Cruz</b></i>
                </div>
            </div>

            <div className="content-row">
                <div className="left-col">
                    <img src={require("./img/about.jpg")} style={{ width: "28vw" }} className="profile-pic" alt="profile" />
                </div>
                <div className="right-col">
                    <p className="main-body">
                        Nice to meet you! 
                        <br /><br />
                        I'm a teacher, engineer, and a musician currently in my 4th year pursuing a Computer Engineering B.S. degree and a minor in Electronic Music. I'm expecting to graduate in June 2025.
                        On the engineering side, I'm interested in chip design, FPGA/ASIC development, and making hardware design education more accessible for all.
                        On the music side, I like working in recording engineering, sound design, and music production.
                        <br /><br />
                        I'm currently working with Professor Dustin Richmond at UCSC as a Instructional Design Research Assistant for CSE 100, Intro to Logic Design.
                        <br /><br />
                        I also teach private piano lessons for elementary school students. Email me if you're interested!
                    </p>
                    <div className="footer">
                        <a href="mailto:rphlhuang@gmail.com" target="_blank" rel="noopener noreferrer">
                            <img className="icon" src={email} alt="Email" />
                        </a>
                        <a href="https://github.com/rphlhuang" target="_blank" rel="noopener noreferrer">
                            <img className="icon" src={github} alt="GitHub" />
                        </a>
                        <a href="https://www.linkedin.com/in/rphlhuang" target="_blank" rel="noopener noreferrer">
                            <img className="icon-linkedin" src={linkedin} alt="LinkedIn" />
                        </a>
                    </div>
                </div>
            </div>

        </div>

    </div>
  );
}

export default About;