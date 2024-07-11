"use client";

import React from "react";

type ColorButtonsProps = {
  handleColorChange: (color: string) => void;
};

const ColorButtons: React.FC<ColorButtonsProps> = ({ handleColorChange }) => {
  return (
    <div className="flex space-x-6 justify-center ">
      <button type="button" style={{ backgroundColor: "#ffcccc" }} onClick={() => handleColorChange("#ffcccc")}>
        <div className="w-12 h-12 shadow-md"></div>
      </button>
      <button type="button" style={{ backgroundColor: "#ccffcc" }} onClick={() => handleColorChange("#ccffcc")}>
        <div className="w-12 h-12 shadow-md"></div>
      </button>
      <button type="button" style={{ backgroundColor: "#ccccff" }} onClick={() => handleColorChange("#ccccff")}>
        <div className="w-12 h-12 shadow-md"></div>
      </button>
      <button type="button" style={{ backgroundColor: "#ffccff" }} onClick={() => handleColorChange("#ffccff")}>
        <div className="w-12 h-12 shadow-md"></div>
      </button>
    </div>
  );
};

export default ColorButtons;
