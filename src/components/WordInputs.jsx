import React, { useEffect, useRef, useState } from "react";
import Cell from "./Cell";

import wordArray from "../data/dictionary.js";

export default function WordInputs({ actionListener, wordLength = 6 }) {
  const [borderColor, setBorderColor] = useState("grey");
  const [letters, setLetters] = useState([]);

  const handleAddLetter = (letter) => {
    setLetters((prevLetters) => {
      if (prevLetters.length >= wordLength) return prevLetters;

      const copyLetters = [...prevLetters];
      copyLetters.push(letter);
      return copyLetters;
    });
    setBorderColor("grey");
  };

  const handleRemoveLetter = () => {
    setLetters((prevLetters) => {
      if (prevLetters.length === 0) return prevLetters;

      const copyLetters = [...prevLetters];
      copyLetters.pop();
      return copyLetters;
    });
    setBorderColor("grey");
  };

  const checkWordExists = () => {
    setLetters((prevLetters) => {
      if (wordLength > prevLetters.length) setBorderColor("red");
      else if (wordArray.indexOf(prevLetters.join("").toLowerCase()) === -1) setBorderColor("red");
      else setBorderColor("green");

      return prevLetters;
    });
  };

  useEffect(() => {
    actionListener.registerListener("letterBtnClicked", handleAddLetter);
    actionListener.registerListener("enterClicked", checkWordExists);
    actionListener.registerListener("backspaceClicked", handleRemoveLetter);

    return () => {
      actionListener.removeListener("letterBtnClicked");
      actionListener.removeListener("enterClicked");
      actionListener.removeListener("backspaceClicked");
    };
  }, []);

  return (
    <div className="w-2/3 flex justify-center items-center">
      {React.Children.toArray(
        Array.from({ length: wordLength }, (_, i) => {
          console.log(letters);
          return <Cell borderColor={borderColor}>{i > letters.length ? "" : letters[i]}</Cell>;
        })
      )}
    </div>
  );
}
