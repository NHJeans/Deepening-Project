"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import { useUserStore } from "@/store";

const LoginPage = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setError("로그인 정보가 일치하지 않습니다.");
      } else {
        setError(error.message);
      }
      return;
    }

    const user = data.user;
    if (user) {
      setUser({
        id: user.id,
        email: user.email ?? "",
        nickname: "",
        profile_img: user.user_metadata.avatar_url ?? null,
      });

      router.push("/clubs");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-customYellow">
      <button onClick={() => router.back()} className="self-start m-4">
        <Image src="/back.png" alt="Back" width={24} height={24} />
      </button>
      <Image src="/logo.png" alt="Logo" width={150} height={150} className="mb-8" />
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
