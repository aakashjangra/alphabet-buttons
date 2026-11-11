import { useState, useEffect } from "react";
import "./App.css";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function App() {
  const [output, setOutput] = useState("");

  const addLetter = (letter) => setOutput((prev) => prev + letter);
  const backspace = () => setOutput((prev) => prev.slice(0, -1));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (/^[a-zA-Z]$/.test(e.key)) {
        addLetter(e.key.toUpperCase());
      } else if (e.key === "Backspace") {
        backspace();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="app">
      <h1>Alphabet Buttons</h1>
      <p className="subtitle">Click letters to type</p>

      <div className="output">{output}</div>

      <div className="keys">
        {LETTERS.map((letter) => (
          <button
            key={letter}
            className="key"
            onClick={() => addLetter(letter)}
          >
            {letter}
          </button>
        ))}
        {/* Keep Backspace last so .key lookups like "B" hit the letter button first */}
        <button className="key backspace" onClick={backspace}>
          Backspace
        </button>
      </div>
    </div>
  );
}