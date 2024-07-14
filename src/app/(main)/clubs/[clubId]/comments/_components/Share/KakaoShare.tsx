"use client";
import Image from "next/image";
import { useEffect } from "react";

interface KakaoShareButtonProps {
  id: string;
}

const KakaoShareButton = ({ id }: KakaoShareButtonProps) => {
  console.log("KakaoShareButton id:", id);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const shareUrl = `${baseUrl}/guests/${id}}/createPost`;
  console.log("shareUrl:", shareUrl);

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
    const logoImage = `/logo.png`;

    window.Kakao.Link.sendDefault({
      objectType: "text",
      text: "마음을 전할 수 있는 롤링페이퍼 사이트",

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
        alt="이미지 없음"
        layout="fill"
        className="rounded-lg bg-cover cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110"
      />
    </div>
  );
};

export default KakaoShareButton;
