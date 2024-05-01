import { useEffect } from "react";
import "./App.css";

import Keyboard from "./components/Keyboard";
import { MyActionListener } from "./store/actionListener";
import WordInputs from "./components/WordInputs";

function App() {
  const actionListener = new MyActionListener();

  return (
    <div className="w-full h-screen flex flex-col justify-evenly items-center gap-8">
      <WordInputs actionListener={actionListener} />
      <Keyboard actionListener={actionListener} />
    </div>
  );
}

export default App;
