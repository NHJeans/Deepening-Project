import React from "react";

interface LargeInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LargeInput = ({ type, placeholder, value, onChange }: LargeInputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-[270px] h-[40px] mt-3 p-2 border border-customGreen rounded focus:border-customGreen focus:ring-customGreen focus:ring-2 focus:outline-none"
    />
  );
};

export default LargeInput;
