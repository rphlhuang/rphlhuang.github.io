import React, { useState } from "react";
import CustomNavbar from "./CustomNavbar";
import "./Engineering.css";

function Engineering() {
  const [activeSection, setActiveSection] = useState("hardware");
  const [firstTime, setFirstTime] = useState(true);

  const removeClickMe = () => {
    const clickMe = document.querySelector(".click-me");
    if (clickMe) {
      clickMe.remove();
    }
  }

  const handleToggleSection = (section) => {
    setActiveSection(section);
    if (firstTime) {
        setFirstTime(false);
        removeClickMe();
    }
  };

  return (
    <div className="App">
      <CustomNavbar />
      <div className="main-container-engi">

        <img src={require("./img/fpga.jpg")} className="fpga-img" alt="iCEBreaker FPGA"/>

        <h1 className="section-heading" onClick={() => handleToggleSection("hardware")} >
          Computer Engineering + Hardware Design
        </h1>
        <div className={`collapsible-content ${activeSection === "hardware" ? "expanded" : ""}`} >
          <div className="indent-level-1">
            <p className="description">
              On the hardware side of things, I'm interested in FPGA development, ASIC design,
              VLSI, and computer architecture. I have built projects in Verilog and
              SystemVerilog, worked with Xilinx Vivado and open-source FPGA toolchains,
              and I possess a strong understanding of RISC-V architectures
              as well as the OpenROAD VLSI toolchain.
            </p>

            <div className="indent-level-2">
              <h3>FPGA Design</h3>
              <p className="description">
                I've been working with Xilinx FPGAs using Vivado and have hands-on
                experience with writing and verifying designs in Verilog/SystemVerilog.
                I also have exposure to open-source toolflows (e.g., Yosys, Verilator)
                and sound synthesis using FPGAs.
              </p>

              <div className="indent-level-3">
                <ul className="description project-list">
                  <li><a href="https://github.com/rphlhuang/vivaldi">Vivaldi</a>, a mini FPGA synthesizer for the Nexys Video Board (Artix-7 from Xilinx)</li>
                  <li>A simple <a href="https://github.com/rphlhuang/FPGA-UART-ALU">FPGA ALU</a> that communicates over UART, targeting the iCEBreaker v1.0b</li>
                </ul>
              </div>
            </div>

            <div className="indent-level-2">
              <h3>ASIC Design & Computer Architecture</h3>
              <p className="description">
                I've taken classes and participated in designing and taping out an ASIC using
                the open-source OpenROAD VLSI toolchain. I'm also familiar with RISC-V architectures
                and have worked on designing and optimizing embedded-class RISC-V cores.
              </p>

              <div className="indent-level-3">
                <ul className="description project-list">
                  <li>Participated in <a href="https://tinytapeout.com/runs/tt09/">Tiny Tapeout 9</a></li>
                  <li>Worked on a <a href="/IBEX-core-opt.pdf" target="_blank" rel="noopener noreferrer"> group project</a> optimizing the Ibex RISC-V core (from lowRISC) using OpenLane2</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div style={{display: "flex", alignItems: "flex-end"}}>
            <h1 className="section-heading" id="sw_engi_h1" onClick={() => handleToggleSection("software")}>
              Software Engineering
            </h1>
            <p className="click-me">(expand me!)</p>
        </div>
        <div className={`collapsible-content ${ activeSection === "software" ? "expanded" : ""}`} >
          <div className="indent-level-1">
            <p className="description">
              On the software side, I'm interested in leveraging heterogeneous computing
              platforms (CPUs, GPUs, FPGAs) to accelerate AI/ML. I'm also interested 
              and experience with data analytics and visualization.
              I'm fluent in C, Python, and JS/HTML/CSS, and can integrate backend code with
              frontends using React and Electron.
            </p>


            <div className="indent-level-2">
              <h3>Web Development & Data Visualization</h3>
              <p className="description">
                With React, JS, and CSS, I create dynamic front-end interfaces for
                visualizing data. My passion lies in turning complex information
                into intuitive, interactive dashboards that aid decision-making
                and exploration.
              </p>

              <div className="indent-level-3">
                <ul className="description project-list">
                  <li>This website! </li>
                </ul>
              </div>
            </div>

            <div className="indent-level-2">
              <h3>Heterogeneous Computing</h3>
              <p className="description">
                I'm interested in optimizing AI/ML workflows by distributing workloads
                to hardware accelerators. Working on using my experience 
                with TensorFlow and PyTorch to accelerate training and inference
                in heterogeneous systems.
              </p>

              {/* <div className="indent-level-3">
                <ul className="description project-list">
                  <li>FPGA-Accelerated TensorFlow Kernel (Placeholder)</li>
                  <li>Multi-GPU Data Pipeline (Placeholder)</li>
                </ul>
              </div> */}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Engineering;
