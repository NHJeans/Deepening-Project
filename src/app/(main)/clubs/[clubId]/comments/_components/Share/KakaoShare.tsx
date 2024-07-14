"use client";
import Image from "next/image";
import { useEffect } from "react";

interface KakaoShareButtonProps {
  id: string;
}

const KakaoShareButton = ({ id }: KakaoShareButtonProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const shareUrl = `${baseUrl}/guests/${id}}/createPost`;

  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao) {
      const { Kakao } = window;

      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }
  }, []);

  const handleShare = () => {
    if (typeof window === "undefined" || !window.Kakao || !window.Kakao.isInitialized()) {
      console.error("Kakao SDK가 초기화되지 않았거나 사용할 수 없습니다.");
      return;
    }

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      text: "마음을 전할 수 있는 롤링페이퍼 사이트",
      imageUrl: "https://saayznmhcfprtrehndli.supabase.co/storage/v1/object/public/DeepeningProject/logo.png",
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    });
  };

  return (
    <div onClick={handleShare} className="relative w-[65px] h-[65px] items-center">
      <Image
        src="/icons/share-Kakao.png"
        alt="Kakao 공유 아이콘"
        layout="fill"
        className="rounded-lg bg-cover cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110"
      />
    </div>
  );
};

export default KakaoShareButton;
