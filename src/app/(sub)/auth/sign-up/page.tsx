"use client";

import BackButton from "@/components/Button/BackButton";
import LargeButton from "@/components/Button/LargeButton";
import ButtonInput from "@/components/Input/ButtonInput";
import LargeInput from "@/components/Input/LargeInput";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [emailChecked, setEmailChecked] = useState<boolean | null>(null);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailCheck = async () => {
    setEmailError(null);
    setEmailChecked(null);

    if (!isValidEmail(email)) {
      setEmailError("이메일 형식으로 입력해주세요.");
      setEmailChecked(false);
      return;
    }

    const response = await fetch("/api/auth/email-check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (result.exists) {
      setEmailError("이미 사용 중인 이메일입니다.");
      setEmailChecked(false);
    } else {
      setEmailChecked(true);
    }
  };

  const handleSignUp = async () => {
    setSignUpError(null);
    setEmailError(null);

    if (password !== passwordConfirm) {
      setSignUpError("비밀번호가 일치하지 않습니다.");
      return;
    }

    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, nickname }),
    });

    const result = await response.json();

    if (result.error) {
      setSignUpError(result.error);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-customYellow">
      <BackButton />
      <Image src="/logos/logo.png" alt="Logo" width={150} height={150} className="mb-8" />
      <ButtonInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        buttonText="중복확인"
        onButtonClick={handleEmailCheck}
        label="이메일"
      />
      {emailChecked === false && emailError && <p className="text-red-500 mb-2 mt-2">{emailError}</p>}
      {emailChecked === true && <p className="text-green-500 mt-2">사용 가능한 이메일입니다.</p>}
      <LargeInput type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} label="닉네임" />
      <LargeInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} label="비밀번호" />
      <LargeInput
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        label="비밀번호 확인"
      />
      {signUpError && <p className="text-red-500 mb-4 mt-2">{signUpError}</p>}
      <LargeButton onClick={handleSignUp}>회원가입</LargeButton>
      <Link href="/auth/login" className="underline text-gray-500 py-3">
        이미 회원이신가요?
      </Link>
    </div>
  );
};

export default SignUpPage;
