import React from "react";

interface ButtonInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText: string;
  onButtonClick: () => void;
  label: string;
}

const ButtonInput = ({ type, value, onChange, buttonText, onButtonClick, label }: ButtonInputProps) => {
  return (
    <div className="flex flex-col w-[270px] mt-3">
      <label className="mb-1 font-semibold">{label}</label>
      <div className="flex items-center h-[40px] border border-customGreen rounded focus-within:ring-2 focus-within:ring-customGreen focus-within:outline-none">
        <input type={type} value={value} onChange={onChange} className="flex-1 p-2 h-full outline-none" />
        <button onClick={onButtonClick} className="bg-customGreen text-xs text-white px-3 py-1 rounded-lg mr-1">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ButtonInput;
