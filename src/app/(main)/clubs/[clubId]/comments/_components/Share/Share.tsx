"use client";

import Image from "next/image";
import { useModal } from "@/context/modal.context";

interface DetailShareBtnProps {
  id: string;
}

export default function DetailShareBtn({ id }: DetailShareBtnProps) {
  const modal = useModal();

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    modal.open({
      title: "알림",
      content: `마음을 전달받을 주소가 복사되었습니다.`,
    });
  };

  const handleCopyClick = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const textToCopy = `${baseUrl}/guests/${id}/createPost`;
    copyToClipboard(textToCopy);
  };

  return (
    <>
      <div onClick={handleCopyClick}>
        <div className="relative w-[50px] h-[50px] items-center mb-1">
          <Image
            src="/icons/share-Link.png"
            alt="이미지 없음"
            layout="fill"
            className="rounded-lg bg-cover cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
      </div>
    </>
  );
}
