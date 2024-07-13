"use client";

import { useModal } from "@/context/modal.context";
import { useRouter } from "next/navigation";
import BackDrop from "./BackDrop";

interface ConfirmModalProps {
  title: string;
  content: React.ReactNode | null;
  path?: string;
}

const ConfirmModal = ({ title, content, path }: ConfirmModalProps) => {
  const modal = useModal();
  const router = useRouter();

  const handleConfirmClick = () => {
    if (path) {
      router.push(`${path}`);
    }
    modal.close();
  };

  return (
    <BackDrop>
      <section className="flex flex-col justify-center items-center max-w-72 w-full p-8 gap-4 rounded-lg bg-white">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <div className="modal-content">{content}</div>
        <button
          className="px-4 py-1 bg-customGreen text-white font-semibold border border-gray-200 rounded hover:opacity-85 active:opacity-75"
          onClick={handleConfirmClick}
        >
          확인
        </button>
      </section>
    </BackDrop>
  );
};

export default ConfirmModal;
