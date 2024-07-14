"use client";

import ConfirmModal from "@/components/Commons/Modal/ConfirmModal";
import { createContext, PropsWithChildren, ReactNode, useContext, useState } from "react";

type ModalProps = {
  title: string;
  content: ReactNode | null;
  path?: string;
};

type ModalContextValue = {
  open: (options: ModalProps) => void;
  close: () => void;
};

const initialValue: ModalContextValue = {
  open: () => {},
  close: () => {},
};

const ModalContext = createContext<ModalContextValue>(initialValue);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modalOptions, setModalElements] = useState<ModalProps | null>(null);

  const value: ModalContextValue = {
    open: (options: ModalProps) => {
      setModalElements(options);
    },
    close: () => {
      setModalElements(null);
    },
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalOptions && (
        <ConfirmModal title={modalOptions.title} content={modalOptions.content} path={modalOptions.path} />
      )}
    </ModalContext.Provider>
  );
};
