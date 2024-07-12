"use client";

import React from "react";

interface CustomButtonProps {
  onClick?: (e: React.FormEvent) => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

const CustomButton = ({ onClick, type = "submit", children }: CustomButtonProps) => {
  return (
    <button type={type} onClick={onClick} className="px-4 py-1 bg-customGreen text-white rounded-md shadow-md">
      {children}
    </button>
  );
};

export default CustomButton;
