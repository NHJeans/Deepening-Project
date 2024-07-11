"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import { useUserStore } from "@/store";

const SocialNicknamePage = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleNicknameSubmit = async () => {
    setError(null);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) {
      setError("로그인 정보가 없습니다.");
      return;
    }

    const { error: insertError } = await supabase.from("Users").insert({
      id: user.id,
      email: user.email!,
      nickname,
      profile_img: user.user_metadata.avatar_url || null,
    });

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setUser({
      id: user.id,
      email: user.email,
      nickname,
      profile_img: user.user_metadata.avatar_url || null,
    });

    router.push("/clubs");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-customYellow">
      <button onClick={() => router.back()} className="self-start m-4">
        <Image src="/back.png" alt="Back" width={24} height={24} />
      </button>
      <Image src="/logo.png" alt="Logo" width={96} height={96} className="mb-8" />
      <h1 className="text-2xl font-semibold mb-4">
        <span className="text-customGreen">‘어땠어’</span>에서 사용하실 닉네임을 입력해주세요!
      </h1>
      <label htmlFor="nickname" className="text-lg font-semibold mb-2">
        닉네임
      </label>
      <input
        id="nickname"
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="pr-4 mb-4 p-2 border rounded w-full"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button onClick={handleNicknameSubmit} className="bg-customGreen text-white px-4 py-2 rounded mb-4">
        회원가입
      </button>
    </div>
  );
};

export default SocialNicknamePage;
