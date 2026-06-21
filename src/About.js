import { useState, useEffect } from 'react';
import "./blog/Blog.css"
import "./About.css"
import CustomNavbar from './CustomNavbar.js'
import email from "./img/email.png";
import github from "./img/github.png";
import linkedin from "./img/linkedin.png";


function About() {
    const [emailStatus, setEmailStatus] = useState('idle'); // 'idle' | 'visible' | 'fading'
    const [showCopied, setShowCopied] = useState(false);
    const emailStr = "rphlhuang" + String.fromCharCode(64) + "gmail.com";

    useEffect(() => {
        if (emailStatus === 'visible') {
            const timer = setTimeout(() => setEmailStatus('fading'), 2500);
            return () => clearTimeout(timer);
        }
        if (emailStatus === 'fading') {
            const timer = setTimeout(() => setEmailStatus('idle'), 1000);
            return () => clearTimeout(timer);
        }
    }, [emailStatus]);

    useEffect(() => {
        if (showCopied) {
            const timer = setTimeout(() => setShowCopied(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [showCopied]);

    const handleEmailClick = () => {
        if (emailStatus === 'idle') {
            setEmailStatus('visible');
        } else {
            navigator.clipboard.writeText(emailStr);
            setShowCopied(true);
        }
    };

    return (
        <div className="App">
            <CustomNavbar />

            <div className="main-container">

                <div className="intro-row">
                    <div className="left-col">
                        <h1 className="name">Raphael Huang</h1>
                    </div>
                    <div className="right-col right-col-title">
                        <i><b className="title">Computer Engineering M.S. @ UC Santa Cruz</b></i>
                    </div>
                </div>

                <div className="content-row">
                    <div className="left-col img-container">
                        <img src={require("./img/about.jpg")} className="profile-pic" alt="profile" />
                    </div>
                    <div className="right-col">
                        <p className="main-body">
                            I'm a hardware engineer, educator, and musician pursuing a Master's in
                            Computer Science and Engineering at UC Santa Cruz. I'm expecting to graduate in December 2026.
                            <br /><br />
                            On the hardware side, I'm interested in formal verification and heterogenous computing.
                            My work in education focuses redefining good education in the age of GenAI.
                            <br /><br />
                            I'm currently a TA and the <a href="https://tlc.ucsc.edu/get-involved/join/graduate-pedagogy-fellows/">Graduate Pedagogy Fellow</a> for the Computer Science and Engineering department at UCSC.
                            In the past, I've also worked as a recording engineer, TA, CAV/robotics engineer, and piano teacher.
                            <br /><br />
                            I'm part of the <a href="https://hsc.ucsc.edu/">Hardware Systems Collective</a> at UCSC,
                            where I research open-source alternatives to current
                            proprietary workflows for digital design courses.
                        </p>
                        <div className="footer">
                            <div className="email-wrapper" onClick={handleEmailClick} style={{ cursor: 'pointer', position: 'relative' }}>
                                {emailStatus === 'idle' ? (
                                    <img className="icon" src={email} alt="Email" />
                                ) : (
                                    <div className={`email-revealed-container ${emailStatus === 'fading' ? 'fade-out' : ''}`}>
                                        <div className="email-lines">
                                            <span>rphlhuang</span>
                                            <span>@gmail.com</span>
                                        </div>
                                        <svg className="copy-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor" />
                                        </svg>
                                    </div>
                                )}
                                <div className={`copied-popup ${showCopied ? 'visible' : ''}`}>Copied!</div>
                            </div>
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