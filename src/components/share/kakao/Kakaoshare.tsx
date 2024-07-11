"use client";
import React, { FC, useEffect } from "react";
import Image from "next/image";

interface KakaoShareButtonProps {
  id: string;
}

const KakaoShareButton: FC<KakaoShareButtonProps> = ({ id }) => {
  const shareUrl = `http://localhost:3000/guests/${id}/createPost`;

  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao) {
      const { Kakao } = window;

      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }
  }, []);

  const handleShare = () => {
    if (typeof window !== "undefined" && window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Link.sendDefault({
        objectType: "text",
        text: "마음을 전할 수 있는 롤링페이퍼 사이트",
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      });
    } else {
      console.error("Kakao SDK가 초기화되지 않았거나 사용할 수 없습니다.");
    }
  };

  return (
    // <div onClick={handleShare}>
    //   <Image
    //     className="w-10 h-10 cursor-pointer"
    //     src="https://saayznmhcfprtrehndli.supabase.co/storage/v1/object/public/DeepeningProject/kakao.jfif"
    //     alt="카카오톡 공유 이미지"
    //     width={150}
    //     height={150}
    //   />
    // </div>
    <div onClick={handleShare}>
      <div className="relative w-[50px] h-[50px] items-center">
        <Image
          src="https://saayznmhcfprtrehndli.supabase.co/storage/v1/object/public/DeepeningProject/kakao.jfif"
          alt="이미지 없음"
          layout="fill"
          className="rounded-lg bg-cover cursor-pointer"
        />
      </div>
    </div>
  );
};

export default KakaoShareButton;
