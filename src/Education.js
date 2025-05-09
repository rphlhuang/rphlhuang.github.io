import CustomNavbar from './CustomNavbar';
import "./Education.css";
import { useState } from 'react';
import cse100_1 from './img/cse100_1.png';
import cse100_2 from './img/cse100_2.png';
import cse100_3 from './img/cse100_3.jpeg';
import cse100_4 from './img/cse100_4.jpeg';
import csed_1 from './img/csed_1.jpg';
import csed_2 from './img/csed_2.jpg';
import csed_3 from './img/csed_3.jpg';
import csed_4 from './img/csed_4.png';
import stemed_1 from './img/stemed_1.jpg';
import stemed_2 from './img/stemed_2.jpg';
import stemed_3 from './img/stemed_3.jpg';
import stemed_4 from './img/stemed_4.png';

function Education() {
    const [activeSection, setActiveSection] = useState("none");
    const [expanded, setExpanded] = useState(false);
    const handleLabelClick = (section) => {
        setActiveSection(activeSection === section ? "none" : section);
        setExpanded(true);
        console.log("Switching to section " + section);
    };
    return(
        <div className="App">
            <CustomNavbar />

            {expanded && (
            <button 
                style={{
                    position: 'absolute',
                    left: '20vw',
                    marginTop: '10vh',
                    padding: '8px 16px',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
                onClick={() => {
                    setExpanded(false);
                    setActiveSection("none");
                }}
            >
                ← Back
            </button>
            )}


            {!expanded && (
                <>
                    <div className="main-container-edu">
                        <h1>STEM Education</h1>
                        <h2 onClick={() => handleLabelClick("chip-design")}>1 year of experience in hardware/chip design education</h2>
                        <h2 onClick={() => handleLabelClick("cs-ed")}>2 years of experience in CS education</h2>        
                        <h2 onClick={() => handleLabelClick("stem-ed")}>7 years of experience in STEM education</h2>       
                        <h1>Music Education</h1>
                        <h2>2 years of experience teaching private piano lessons</h2>       
                    </div>
                </>
            )}



            {expanded && (
                <>
                    <div className="main-container-edu">
                        {activeSection === "chip-design" && (
                            <>
                                <div className="background-images">
                                    <img src={cse100_1} alt="CSE100 1" />
                                    <img src={cse100_2} alt="CSE100 2" />
                                    <img src={cse100_3} alt="CSE100 3" />
                                    <img src={cse100_4} alt="CSE100 4" />
                                </div>
                                <div className="content-overlay">
                                    <h2>1 year of experience in hardware/chip design education</h2>
                                    <div className="experience-details">
                                        <h3>Instructional Design Research Assistant at UCSC Baskin Engineering (2024-2025)</h3>
                                        <p>I collaborated with Professor Dustin Richmond to transform the curriculum for <a href="https://catalog.ucsc.edu/en/2020-2021/general-catalog/courses/cse-computer-science-and-engineering/upper-division/cse-100/" target="_blank" rel="noopener noreferrer">CSE 100</a>: Intro to Logic Design, focusing on making hardware education more accessible, equitable, and effective.</p>
                                        <ul>
                                            <li>Redesigned homework, pre-labs, lab assignments, and exams to align with clear, pedagogically sound objectives</li>
                                            <li>Researched and integrated free and open-source hardware/EDA tools such as Yosys, Verilator, and IcarusVerilog</li>
                                            <li>Scaled course enrollment to over 120 students per quarter (previously ~80) by enabling students to complete coursework remotely</li>
                                            <li>Building towards a research paper on mixing proprietary and FOSS EDA tools to achieve broader learning objectives in logic design courses, for submission at a Computer Science Education conference</li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )}
                        {activeSection === "cs-ed" && (
                            <>
                                <div className="background-images">
                                    <img src={csed_1} alt="CS Education 1" />
                                    <img src={csed_2} alt="CS Education 2" />
                                    <img src={csed_3} alt="CS Education 3" />
                                    <img src={csed_4} alt="CS Education 4" />
                                </div>
                                <div className="content-overlay">
                                    <h2>2 years of experience in CS education</h2>
                                    <div className="experience-details">
                                        <h3>Lab Tutor, CSE 125 - UC Santa Cruz, School of Engineering (2024-Present)</h3>
                                        <p>I provide lab tutoring for undergraduate students in CSE 125, Logic Design with Verilog, focusing on FPGA and ASIC design and verification.</p>

                                        <h3>Lead Instructor - iDTech Camps, Stanford University (Summer 2024)</h3>
                                        <p>I led a team of 11 instructors to teach AI/ML programming in Python and VEX Robotics to over 100 students. I launched and refined a pilot program for international students from China and Latin America, adapting curriculum to accommodate different ages, learning paces, and English proficiency levels.</p>

                                        <h3>SystemVerilog YouTube Tutorials (2024-Present)</h3>
                                        <p>I collaborate with Professor Ethan Sifferman to create YouTube tutorials on Verilog/SystemVerilog topics, 
                                            like AXI-style ready-valid handshakes and behavioral Verilog basics. I draft scripts, animate with Manim, 
                                            and edit videos using DaVinci Resolve. Tutorials use an open-source workflow with tools like the Sky130 PDK and Verilator.
                                             <a href="https://github.com/rphlhuang/manim-digital" target="_blank" rel="noopener noreferrer"> github.com/rphlhuang/manim-digital</a></p>
                                    </div>
                                </div>
                            </>
                        )}
                        {activeSection === "stem-ed" && (
                            <>
                                <div className="background-images">
                                    <img src={stemed_1} alt="STEM Education 1" />
                                    <img src={stemed_2} alt="STEM Education 2" />
                                    <img src={stemed_3} alt="STEM Education 3" />
                                    <img src={stemed_4} alt="STEM Education 4" />
                                </div>
                                <div className="content-overlay">
                                    <h2>7 years of experience in STEM education</h2>
                                    <div className="experience-details">
                                        <h3>Math Game Development/Teaching Intern - UCSC CalTeach (2023)</h3>
                                        <p>I researched and developed an online math game for primary school students,
                                            culminating in a presentation at the annual Monterey Bay Area Mathematics Project Summer Institute for 20+ local teachers. 
                                             <a href="https://mbamp.ucsc.edu/" target="_blank" rel="noopener noreferrer"> https://mbamp.ucsc.edu/</a></p>

                                        <h3>Teacher's Assistant - UC Berkeley Academic Talent Development Program (2016-2019)</h3>
                                        <p>I facilitated group discussions, managed classroom resources, and provided instruction assistance for a 4th grade 
                                            Fluid Physics course during summer sessions.
                                            <a href="https://atdp.berkeley.edu/" target="_blank" rel="noopener noreferrer"> https://atdp.berkeley.edu/</a></p>

                                        <h3>Teacher's Assistant - Museum of Art and Digital Entertainment (2016-2017)</h3>
                                        <p>I assisted with classroom activities, monitored student project progress, 
                                            and helped debug code for introductory Scratch and Python programming courses.
                                            <a href="https://www.themade.org/" target="_blank" rel="noopener noreferrer"> https://www.themade.org/</a></p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}


        </div>

    );
}


export default Education;