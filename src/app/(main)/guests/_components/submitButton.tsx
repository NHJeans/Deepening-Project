import React from "react";

interface CustomButtonProps {
  onClick?: (event: React.FormEvent) => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, type = "submit", children }) => {
  return (
    <button type={type} onClick={onClick} className="px-4 py-1 bg-customGreen text-white rounded-md shadow-md">
      {children}
    </button>
  );
};

export default CustomButton;
