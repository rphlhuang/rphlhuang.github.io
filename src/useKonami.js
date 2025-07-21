import { useEffect, useRef } from "react";

/** Runs `onSuccess` the moment the user finishes ↑↑↓↓←→←→ B A */
export default function useKonami(onSuccess) {
  const indexRef = useRef(0);
  const KONAMI = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a",
    "Enter"
  ];

  useEffect(() => {
    function handler(e) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key; // normalise
      if (key === KONAMI[indexRef.current]) {
        indexRef.current += 1;
        if (indexRef.current === KONAMI.length) {
          onSuccess();              // 🎉
          indexRef.current = 0;     // reset for next time
        }
      } else {
        indexRef.current = 0;       // start over on any mismatch
      }
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onSuccess]);
}
