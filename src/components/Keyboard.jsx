import React, { useEffect } from "react";
import Button from "./Button";
import { alphabet } from "../data/keyboard";

export default function Keyboard({ actionListener }) {
  const handleLetterBtnClick = (e) => {
    const { value } = e.target;
    actionListener.emit("letterBtnClicked", value);
  };

  const handleEnterClick = () => {
    actionListener.emit("enterClicked");
  };
  const handleBackspaceClick = () => {
    actionListener.emit("backspaceClicked");
  };

  return (
    <div>
      <div className="w-1/2 mx-auto">
        {React.Children.toArray(
          alphabet.map((letter) => (
            <Button value={letter} onClick={handleLetterBtnClick}>
              {letter}
            </Button>
          ))
        )}
      </div>
      <div>
        <Button value="enter" onClick={handleEnterClick}>
          Enter
        </Button>
        <Button value="backspace" onClick={handleBackspaceClick}>
          Backspace
        </Button>
      </div>
    </div>
  );
}
