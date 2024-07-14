import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#F3F4F6] p-6 rounded-lg shadow-lg relative" style={{ width: "280px" }}>
        <button
          className="absolute top-2 right-2 bg-transparent text-black hover:text-red-500 transition duration-300 ease-in-out focus:outline-none text-2xl mr-2.5"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-center font-bold text-xl mb-4 text-[#333333] ">공유하기</div>
        <div className="flex flex-col items-center space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
