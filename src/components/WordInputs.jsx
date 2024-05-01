import React, { useEffect, useRef, useState } from "react";
import Cell from "./Cell";

import wordArray from "../data/dictionary.js";

export default function WordInputs({ actionListener, wordLength = 6 }) {
  const [borderColor, setBorderColor] = useState("grey");
  const [letters, setLetters] = useState(Array.from({ length: wordLength }, (_) => ""));
  const indexRef = useRef(0);

  const handleAddLetter = (letter) => {
    if (indexRef.current >= letters.length) return;

    setLetters((prevLetters) => {
      const copyLetters = [...prevLetters];
      copyLetters[indexRef.current] = letter;

      indexRef.current = indexRef.current + 1;
      return copyLetters;
    });
    setBorderColor("grey");
  };

  const handleRemoveLetter = () => {
    indexRef.current = indexRef.current - 1;
    if (indexRef.current < 0) return;

    setLetters((prevLetters) => {
      const copyLetters = [...prevLetters];
      copyLetters[indexRef.current] = "";

      return copyLetters;
    });
    setBorderColor("grey");
  };

  const checkWordExists = () => {
    setLetters((prevLetters) => {
      if (indexRef.current < prevLetters.length) setBorderColor("red");
      if (wordArray.indexOf(prevLetters.join("").toLowerCase()) === -1) setBorderColor("red");
      else setBorderColor("green");

      return prevLetters;
    });
  };

  //   const [letters, setLetters] = useState("");

  //   const handleAddLetter = (letter) => {
  //     setLetters((prev) => {
  //       if (prev.length < 6) return prev + letter;
  //       return prev;
  //     });
  //   };

  //   const handleRemoveLetter = () => {
  //     setLetters((prev) => {
  //       if (prev.length > 0) return prev.slice(0, -1);
  //       return prev;
  //     });
  //   };

  //   const checkWordExists = () => {
  //     setLetters((prev) => {
  //       if (prev.length === 6) setBorderColor("green");
  //       else setBorderColor("red");
  //       return prev;
  //     });
  //   };

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
      {React.Children.toArray(letters.map((l) => <Cell borderColor={borderColor}>{l}</Cell>))}
      {/* {React.Children.toArray(Array.from(Array(6), (_, i) => <Cell borderColor={borderColor}>{letters[i]}</Cell>))} */}
    </div>
  );
}
