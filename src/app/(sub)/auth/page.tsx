"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AuthSelectionPage = () => {
  const router = useRouter();

  const handleLogin = (method: string) => {
    router.push(`/auth/${method}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-customYellow">
      <button onClick={() => router.back()} className="self-start m-4">
        <img src="/back.png" alt="Back" className="w-6 h-6" />
      </button>
      <h1 className="text-4xl font-bold mb-8">어땠어?</h1>
      <img src="/logo.png" alt="Logo" width={150} height={150} className="mb-8" />
      <p className="mb-4">로그인 방식을 선택해주세요</p>
      <div className="flex space-x-4 mb-8">
        <button onClick={() => handleLogin("login")} className="flex flex-col items-center">
          <img src="/email.png" alt="Email" className="w-12 h-12 mb-2" />
          <span>email</span>
        </button>
        <button onClick={() => handleLogin("google")} className="flex flex-col items-center">
          <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <Image src="/google-logo.png" alt="Google" width={24} height={24} />
          </div>
          <span>소셜로그인</span>
        </button>
        <button onClick={() => handleLogin("kakao")} className="flex flex-col items-center">
          <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <Image src="/kakao-logo.png" alt="Kakao" width={24} height={24} />
          </div>
          <span>소셜로그인</span>
        </button>
      </div>
    </div>
  );
};

export default AuthSelectionPage;
