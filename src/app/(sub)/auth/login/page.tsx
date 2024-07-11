"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleLogin = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push("/clubs");
    }
  };

  const handleKakaoLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
    });
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-customYellow">
      <button onClick={() => router.back()} className="self-start m-4">
        <img src="/back.png" alt="Back" className="w-6 h-6" />
      </button>
      <img src="/logo.png" alt="Logo" width={150} height={150} className="mb-8" />
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button onClick={handleLogin} className="bg-customGreen text-white px-4 py-2 rounded mb-4">
        로그인
      </button>
      <button onClick={() => router.push("/auth/sign-up")} className="text-lightgrey-500">
        아직 회원이 아니신가요?
      </button>
    </div>
  );
};

export default LoginPage;
