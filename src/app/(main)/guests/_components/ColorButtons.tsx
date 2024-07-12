"use client";

type ColorButtonsProps = {
  handleColorChange: (color: string) => void;
};

const ColorButtons = ({ handleColorChange }: ColorButtonsProps) => {
  return (
    <div className="flex space-x-6 justify-center ">
      <button type="button" style={{ backgroundColor: "#ffcccc" }} onClick={() => handleColorChange("#FFBABA")}>
        <div className="w-12 h-12 shadow-md"></div>
      </button>
      <button type="button" style={{ backgroundColor: "#ccffcc" }} onClick={() => handleColorChange("#8DE8A6")}>
        <div className="w-12 h-12 shadow-md"></div>
      </button>
      <button type="button" style={{ backgroundColor: "#ccccff" }} onClick={() => handleColorChange("#84BBFD")}>
        <div className="w-12 h-12 shadow-md"></div>
      </button>
      <button type="button" style={{ backgroundColor: "#ffccff" }} onClick={() => handleColorChange("#E4AFED")}>
        <div className="w-12 h-12 shadow-md"></div>
      </button>
    </div>
  );
};

export default ColorButtons;
