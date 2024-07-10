"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const checkEmailExists = async () => {
    setEmailError(null);
    const { data, error } = await supabase.from("Users").select("id").eq("email", email).single();

    if (data) {
      setEmailError("이미 사용 중인 이메일입니다.");
    } else if (error && error.code !== "PGRST116") {
      // PGRST116: No matching rows
      setEmailError(error.message);
    }
  };

  const checkNicknameExists = async () => {
    setNicknameError(null);
    const { data, error } = await supabase.from("Users").select("id").eq("nickname", nickname).single();

    if (data) {
      setNicknameError("이미 사용 중인 닉네임입니다.");
    } else if (error && error.code !== "PGRST116") {
      // PGRST116: No matching rows
      setNicknameError(error.message);
    }
  };

  const handleSignUp = async () => {
    setSignUpError(null);

    if (password !== passwordConfirm) {
      setSignUpError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // Supabase auth에 사용자 생성
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setSignUpError(signUpError.message);
      return;
    }

    const userId = signUpData.user?.id;
    if (!userId) {
      setSignUpError("사용자 생성에 실패했습니다.");
      return;
    }

    const { error: insertError } = await supabase.from("Users").insert({ id: userId, email, nickname });

    if (insertError) {
      setSignUpError(insertError.message);
      return;
    }

    router.push("/auth/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-customYellow">
      <button onClick={() => router.back()} className="self-start m-4">
        <img src="/back.png" alt="Back" className="w-6 h-6" />
      </button>
      <img src="/logo.png" alt="Logo" className="mb-8 w-24 h-24" />
      <h1 className="text-4xl font-bold mb-8">어땠어?</h1>
      <div className="flex items-center mb-2 w-full">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button onClick={checkEmailExists} className="ml-2 bg-customGreen text-white px-4 py-2 rounded">
          중복확인
        </button>
      </div>
      {emailError && <p className="text-red-500 mb-2">{emailError}</p>}
      <div className="flex items-center mb-2 w-full">
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button onClick={checkNicknameExists} className="ml-2 bg-customGreen text-white px-4 py-2 rounded">
          중복확인
        </button>
      </div>
      {nicknameError && <p className="text-red-500 mb-2">{nicknameError}</p>}
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      {signUpError && <p className="text-red-500 mb-4">{signUpError}</p>}
      <button onClick={handleSignUp} className="bg-customGreen text-white px-4 py-2 rounded mb-4">
        회원가입
      </button>
      <button onClick={() => router.push("/auth/login")} className="text-lightgrey-500">
        이미 회원이신가요?
      </button>
    </div>
  );
};

export default SignUpPage;
