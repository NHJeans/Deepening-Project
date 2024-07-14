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
        className="border-2 border-gray outline-customGreen w-[270px] h-[35px] p-3 text-sm rounded-lg"
      />
    </div>
  );
};

export default LargeInput;
