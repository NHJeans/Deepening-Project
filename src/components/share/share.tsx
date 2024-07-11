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
    const textToCopy = `http://localhost:3000/guests/${params.id}/createPost`;
    copyToClipboard(textToCopy);
  };
  return (
    <>
      <div onClick={handleCopyClick}>
        <div className="relative w-[50px] h-[50px] items-center">
          <Image
            src="https://saayznmhcfprtrehndli.supabase.co/storage/v1/object/public/DeepeningProject/link.jpg"
            alt="이미지 없음"
            layout="fill"
            className="rounded-lg bg-cover cursor-pointer"
          />
        </div>
      </div>

      {/* <div className="fixed bottom-5 left-0 w-full flex justify-center items-center pb-4">
        <button
          onClick={handleCopyClick}
          className="w-[290px] py-2 rounded text-white bg-customGreen hover:bg-customGreen hover:bg-opacity-80"
        >
          공유하기
        </button>
      </div> */}
    </>
  );
}
