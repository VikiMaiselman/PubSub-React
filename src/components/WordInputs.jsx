import React, { useEffect, useRef, useState } from "react";
import Cell from "./Cell";

import wordArray from "../data/dictionary.js";

export default function WordInputs({ actionListener, wordLength = 6 }) {
  const [borderColor, setBorderColor] = useState("");
  const [letters, setLetters] = useState(Array.from({ length: wordLength }, (_) => ""));
  const lettersRef = useRef(letters);
  const indexRef = useRef(0);

  const handleAddLetter = (letter) => {
    if (indexRef.current >= letters.length) return;

    setLetters((prevLetters) => {
      const copyLetters = [...prevLetters];
      copyLetters[indexRef.current] = letter;
      console.log(copyLetters);
      indexRef.current = indexRef.current + 1;
      lettersRef.current = copyLetters;
      return copyLetters;
    });
  };

  const handleRemoveLetter = () => {
    indexRef.current = indexRef.current - 1;
    if (indexRef.current < 0) return;

    setLetters((prevLetters) => {
      const copyLetters = [...prevLetters];
      copyLetters[indexRef.current] = "";
      lettersRef.current = copyLetters;
      return copyLetters;
    });
  };

  const checkWordExists = () => {
    console.log(wordArray.indexOf(lettersRef.current.join("").toLowerCase()));
    if (indexRef.current < lettersRef.current.length) setBorderColor("red");
    if (wordArray.indexOf(lettersRef.current.join("").toLowerCase()) === -1) setBorderColor("red");
    else setBorderColor("green");

    console.log(borderColor);
  };

  useEffect(() => {
    actionListener.registerListener("letterBtnClicked", handleAddLetter);
    actionListener.registerListener("enterClicked", checkWordExists);
    actionListener.registerListener("backspaceClicked", handleRemoveLetter);
  }, []);

  return (
    <div className="w-2/3 mx-auto">
      {React.Children.toArray(letters.map((l) => <Cell borderColor={borderColor}>{l}</Cell>))}
    </div>
  );
}
