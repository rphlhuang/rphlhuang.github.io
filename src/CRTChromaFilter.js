import { useEffect } from "react";

export default function CRTChromaFilter() {
  /* 1.  Inject / clean up the style tag */
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "crt-style";
    style.textContent = `
      html, body, #root {
        height: 100%;
        filter: url(#crt-chroma) contrast(1.4) brightness(0.68);
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

        animation: crtFlicker 250ms steps(1) infinite;
        z-index: 9999;
      }

      /* vignette */
      body::after {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        background: radial-gradient(circle at center,
            rgba(0,0,0,0) 87%,
            rgba(0,0,0,0.1) 100%);
        z-index: 9998;
      }


    @keyframes crtFlicker {
    0%   { opacity: 1;   }
    30%  { opacity: 0.98;}
    60%  { opacity: 1;   }
    90%  { opacity: 0.9; }   /* occasional deeper dip */
    100% { opacity: 1;   }
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
        <filter id="crt-chroma" colorInterpolationFilters="sRGB">
            <feOffset in="SourceGraphic" dx="0" dy="-0.5" result="redShift"/>
            <feComponentTransfer in="redShift" result="red">
                <feFuncR type="identity"/>
                <feFuncG type="table" tableValues="0 0"/>   {/* nuke G */}
                <feFuncB type="table" tableValues="0 0"/>   {/* nuke B */}
            </feComponentTransfer>

            <feOffset in="SourceGraphic" dx="0" dy="0.5" result="blueShift"/>
            <feComponentTransfer in="blueShift" result="blue">
                <feFuncR type="table" tableValues="0 0"/>   {/* nuke R */}
                <feFuncG type="identity"/>                  {/* KEEP G ✅ */}
                <feFuncB type="identity"/>                  {/* keep B */}
            </feComponentTransfer>

            <feBlend in="red" in2="blue" mode="screen" result="rb"/>

            <feBlend in="SourceGraphic" in2="rb" mode="screen"/>
        </filter>
      </defs>
    </svg>
  );
}
