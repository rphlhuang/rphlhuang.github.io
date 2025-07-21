import { useEffect } from "react";

export default function CRTChromaFilter() {
  /* 1.  Inject / clean up the style tag */
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "crt-style";
    style.textContent = `
      html, body, #root {
        height: 100%;
        filter: url(#crt-chroma) contrast(1.1) brightness(0.9);
      }

      /* scan-lines */
      body::before {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        background: repeating-linear-gradient(
          0deg,
          rgba(0,0,0,0.15) 0px,
          rgba(0,0,0,0.15) 1px,
          rgba(0,0,0,0)   1px,
          rgba(0,0,0,0)   3px
        );
        mix-blend-mode: multiply;
        animation: flicker 60ms step-start infinite;
        z-index: 9999;
      }

      /* vignette */
      body::after {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        background: radial-gradient(circle at center,
            rgba(0,0,0,0) 80%,
            rgba(0,0,0,0.1) 100%);
        z-index: 9998;
      }

      @keyframes flicker {
        0%, 42%, 100% { opacity: 1; }
        43%           { opacity: 0.93; }
      }
    `;
    document.head.appendChild(style);

    /* cleanup when component unmounts */
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  /* 2.  SVG filter definition itself */
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", width: 0, height: 0 }}
    >
      <defs>
        <filter id="crt-chroma">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 1 0"
            result="base"
          />
          <feOffset in="base" dx="0.3"  dy="0" result="red" />
          <feOffset in="base" dx="0.3" dy="0" result="blue" />
          <feBlend  in="red"  in2="blue" mode="screen" result="rgb" />
          <feBlend  in="rgb"  in2="base" mode="screen" />
        </filter>
      </defs>
    </svg>
  );
}
