import React from "react";

interface ButtonInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText: string;
  onButtonClick: () => void;
}

const ButtonInput = ({ type, placeholder, value, onChange, buttonText, onButtonClick }: ButtonInputProps) => {
  return (
    <div className="flex items-center bg-white w-[270px] h-[40px] mt-3 border border-customGreen rounded focus-within:border-customGreen focus-within:ring-customGreen focus-within:ring-2 focus-within:outline-none">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 p-2 h-full outline-none"
      />
      <button onClick={onButtonClick} className="bg-customGreen text-xs text-white px-3 py-1 rounded-lg mr-1">
        {buttonText}
      </button>
    </div>
  );
};

export default ButtonInput;
