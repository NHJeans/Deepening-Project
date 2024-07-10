interface ButtonSmProps {
  children: React.ReactNode;
  onClick?: () => void;
}

import React from "react";

const ButtonSm: React.FC<ButtonSmProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="bg-customGreen rounded-lg text-white text-xs px-2 py-[2.5px]">
      {children}
    </button>
  );
};

export default ButtonSm;
