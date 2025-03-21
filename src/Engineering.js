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
          Hardware
        </h1>
        <div className={`collapsible-content ${activeSection === "hardware" ? "expanded" : ""}`} >
          <div className="indent-level-1">
            <p className="description">
              My journey in hardware has been focused on FPGA development, ASIC design,
              VLSI, and computer architecture. I have built projects in Verilog and
              SystemVerilog, and I possess a strong understanding of RISC-V architectures
              as well as the OpenROAD VLSI toolchain.
            </p>

            <div className="indent-level-2">
              <h3>FPGA Design</h3>
              <p className="description">
                I've been working with Xilinx FPGAs using Vivado and have hands-on
                experience with writing and verifying designs in Verilog/SystemVerilog.
                I also have exposure to open-source toolflows (e.g., Yosys, nextpnr)
                and RISC-V-based SoC overlays.
              </p>

              <div className="indent-level-3">
                <ul className="description project-list">
                  <li>FPGA-based RISC-V SoC (Placeholder)</li>
                  <li>Verilator + SystemVerilog Example (Placeholder)</li>
                </ul>
              </div>
            </div>

            <div className="indent-level-2">
              <h3>ASIC Design & Computer Architecture</h3>
              <p className="description">
                Recently, I've participated in designing and taping out an ASIC using
                open-source flows like OpenLane. I'm fascinated by the entire stack of VLSI
                design, from HDL coding to physical layout, and the intricacies of RISC-V
                CPU cores.
              </p>

              <div className="indent-level-3">
                <ul className="description project-list">
                  <li>Tiny Tapeout ASIC (Placeholder)</li>
                  <li>OpenROAD Physical Design Flow (Placeholder)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style={{display: "flex", alignItems: "flex-end"}}>
            <h1 className="section-heading" onClick={() => handleToggleSection("software")}>
            Software
            </h1> <p className="click-me">(expand me!)</p>
        </div>
        <div className={`collapsible-content ${ activeSection === "software" ? "expanded" : ""}`} >
          <div className="indent-level-1">
            <p className="description">
              On the software side, I'm interested in leveraging heterogeneous computing
              platforms (CPUs, GPUs, FPGAs) to accelerate AI/ML and data analytics tasks.
              I'm fluent in C, Python, and can integrate solutions with front-end
              technologies like React.
            </p>

            <div className="indent-level-2">
              <h3>Heterogeneous Computing</h3>
              <p className="description">
                My work focuses on optimizing AI/ML workflows by distributing workloads
                across different hardware accelerators. Combining FPGA-based offloading
                with CPU/GPU resources can lead to significant speed-ups for inference
                and training.
              </p>

              <div className="indent-level-3">
                <ul className="description project-list">
                  <li>FPGA-Accelerated TensorFlow Kernel (Placeholder)</li>
                  <li>Multi-GPU Data Pipeline (Placeholder)</li>
                </ul>
              </div>
            </div>

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
                  <li>React-based Data Viz Dashboard (Placeholder)</li>
                  <li>Flask + React AI Web App (Placeholder)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Engineering;
