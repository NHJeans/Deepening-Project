"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

const AuthSelectionPage = () => {
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (method: string) => {
    if (method === "kakao") {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) {
        console.error("Kakao login error:", error.message);
        return;
      }
      return;
    }
    router.push(`/auth/${method}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-customYellow">
      <button onClick={() => router.back()} className="self-start m-4">
        <Image src="/back.png" alt="Back" width={24} height={24} />
      </button>
      <h1 className="text-4xl font-semibold mb-8">어땠어?</h1>
      <Image src="/logo.png" alt="Logo" width={150} height={150} className="mb-8" />
      <p className="mb-4">로그인 방식을 선택해주세요</p>
      <div className="flex space-x-6 mb-8">
        <button onClick={() => handleLogin("login")} className="flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center mb-2">
            <Image src="/email.png" alt="Email" width={48} height={48} />
          </div>
          <span>Email</span>
        </button>
        <button onClick={() => handleLogin("google")} className="flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center mb-2">
            <Image src="/logos/google-logo.png" alt="Google" width={48} height={48} />
          </div>
          <span>Google</span>
        </button>
        <button onClick={() => handleLogin("kakao")} className="flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center mb-2">
            <Image src="/logos/kakao-logo.png" alt="Kakao" width={48} height={48} />
          </div>
          <span>Kakao</span>
        </button>
      </div>
    </div>
  );
};

export default AuthSelectionPage;
