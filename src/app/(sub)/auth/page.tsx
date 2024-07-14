"use client";

import BackButton from "@/components/Button/BackButton";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AuthSelectionPage = () => {
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (method: string) => {
    if (method === "kakao" || method === "google") {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: method,
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) {
        console.error(`${method} login error:`, error.message);
      }
    } else {
      router.push(`/auth/${method}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-customYellow">
      <BackButton />
      <Image src="/logos/title-logo.png" alt="어땠어?" width={250} height={150} className="mb-8" />
      <Image src="/logos/logo.png" alt="Logo" width={150} height={150} className="mb-8" />
      <p className="mb-6 font-semibold">로그인 방식을 선택해주세요</p>
      <div className="flex space-x-6 mb-8">
        <button onClick={() => handleLogin("login")} className="flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center mb-2">
            <Image src="/logos/email.png" alt="Email" width={48} height={48} />
          </div>
          <span className="font-semibold">Email</span>
        </button>
        <button onClick={() => handleLogin("google")} className="flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center mb-2">
            <Image src="/logos/google-logo.png" alt="Google" width={48} height={48} />
          </div>
          <span className="font-semibold">Google</span>
        </button>
        <button onClick={() => handleLogin("kakao")} className="flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center mb-2">
            <Image src="/logos/kakao-logo.png" alt="Kakao" width={48} height={48} />
          </div>
          <span className="font-semibold">Kakao</span>
        </button>
      </div>
    </div>
  );
};

export default AuthSelectionPage;
