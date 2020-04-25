import React, { useState } from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch, { clear } from "./sketches/sketch";

function App() {
  const [color, setColor] = useState(80);
  const [random, setRandom] = useState(false);
  const [running, setRunning] = useState(true);

  return (
    <div className="bg-indigo-300 h-screen">
      <nav className="flex items-center justify-between bg-indigo-600 p-3">
        <div className="inline-flex">
          <button
            // className="m-1 p-3 rounded-md bg-yellow-500"
            className="bg-indigo-600 border-indigo-800 hover:border-yellow-500 text-indigo-200 hover:text-indigo-100 p-2 border-2 rounded-l"
            onClick={() => {
              setRandom((oldRandom) => !oldRandom);
            }}
          >
            Random Color
          </button>
          <button
            // className="m-1 p-3 rounded-md bg-yellow-500"
            className="bg-indigo-600 border-indigo-800 hover:border-yellow-500 text-indigo-200 hover:text-indigo-100 p-2 border-2 border-l-0 "
            onClick={() => {
              setRandom(false);
              setColor(Math.floor(Math.random() * 255));
            }}
          >
            Change Color
          </button>
          <button
            // className="m-1 p-3 rounded-md bg-yellow-500"
            className="bg-indigo-600 border-indigo-800 hover:border-yellow-500 text-indigo-200 hover:text-indigo-100 p-2 border-2 border-l-0"
            onClick={() => clear()}
          >
            Clear
          </button>
          <button
            // className="m-1 p-3 rounded-md bg-yellow-500"
            className="bg-indigo-600 border-indigo-800 hover:border-yellow-500 text-indigo-200 hover:text-indigo-100 p-2 border-2 border-l-0 rounded-r"
            onClick={() => setRunning((old) => !old)}
          >
            {running ? "Stop" : "Play"}
          </button>
        </div>
      </nav>
      <section className="w-full flex justify-center align-middle">
        <P5Wrapper
          sketch={sketch}
          color={color}
          random={random}
          running={running}
        />
      </section>
    </div>
  );
}

export default App;
