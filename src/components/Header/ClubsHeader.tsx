import React from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import ButtonSm from "../Button/ButtonSm";
import HeaderSection from "./HeaderSection";

const ClubsHeader = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });
      router.push("/");
    } else {
      console.error("로그아웃 실패:", error.message);
    }
  };

  return (
    <HeaderSection>
      <img src="logo.png" alt="logo" className="w-10" />
      <div className="ml-4">
        <strong>닉네임</strong>
        <div className="space-x-2">
          <ButtonSm>정보수정</ButtonSm>
          <ButtonSm onClick={handleLogout}>로그아웃</ButtonSm>
        </div>
      </div>
    </HeaderSection>
  );
};

export default ClubsHeader;
