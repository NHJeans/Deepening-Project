"use client";

type ColorButtonsProps = {
  handleColorChange: (color: string) => void;
};

const COLORS = [
  { bgColor: "#ffcccc", colorCode: "#FFBABA" },
  { bgColor: "#ccffcc", colorCode: "#8DE8A6" },
  { bgColor: "#ccccff", colorCode: "#84BBFD" },
  { bgColor: "#ffccff", colorCode: "#E4AFED" },
];

const ColorButtons = ({ handleColorChange }: ColorButtonsProps) => {
  return (
    <div className="flex space-x-6 justify-center">
      {COLORS.map(({ bgColor, colorCode }) => (
        <button
          key={colorCode}
          className="transition-transform transform hover:scale-105"
          type="button"
          style={{ backgroundColor: bgColor }}
          onClick={() => handleColorChange(colorCode)}
        >
          <div className="w-12 h-12 shadow-md"></div>
        </button>
      ))}
    </div>
  );
};

export default ColorButtons;
