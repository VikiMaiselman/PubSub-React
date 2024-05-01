import React, { useEffect } from "react";
import Button from "./Button";
import { alphabet } from "../data/keyboard";

export default function Keyboard({ actionListener }) {
  const handleLetterBtnClick = (e) => {
    const { value } = e.target;
    try {
      actionListener.emit("letterBtnClicked", value);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEnterClick = () => {
    try {
      actionListener.emit("enterClicked");
    } catch (error) {
      console.error(error);
    }
  };
  const handleBackspaceClick = () => {
    try {
      actionListener.emit("backspaceClicked");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (alphabet.includes(e.key.toUpperCase())) {
        actionListener.emit("letterBtnClicked", e.key.toUpperCase());
      } else if (e.key === "Enter") {
        actionListener.emit("enterClicked");
      } else if (e.key === "Backspace") {
        actionListener.emit("backspaceClicked");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
