import React from "react";

interface LargeInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const LargeInput = ({ type, value, onChange, label }: LargeInputProps) => {
  return (
    <div className="flex flex-col w-[270px] mt-3">
      <label className="mb-1 font-semibold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-customGreen rounded focus:ring-2 focus:ring-customGreen focus:outline-none"
      />
    </div>
  );
};

export default LargeInput;
