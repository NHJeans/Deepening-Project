"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

export default function DetailShareBtn() {
  const params = useParams() as { id: string };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert(`http://localhost:3000/guests/${params.id}/createPost : 클립보드에 복사되었습니다.`);
  };

  const handleCopyClick = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const textToCopy = `${baseUrl}/guests/${params.id}/createPost`;
    copyToClipboard(textToCopy);
  };
  return (
    <>
      <div onClick={handleCopyClick}>
        <div className="relative w-[60px] h-[60px] items-center">
          <Image
            src="https://saayznmhcfprtrehndli.supabase.co/storage/v1/object/public/DeepeningProject/free_icon_link_455691.png"
            alt="이미지 없음"
            layout="fill"
            className="rounded-lg bg-cover cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
      </div>
    </>
  );
}
