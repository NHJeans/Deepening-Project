"use client";

import { useUserProfile } from "@/store/queries/useUserProfileQueries";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SmallButton from "../Button/SmallButton";
import HeaderSection from "./HeaderSection";

const ClubsHeader = () => {
  const { data, isLoading, error } = useUserProfile();
  const router = useRouter();
  const supabase = createClient();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user profile</div>;

  const profileImg = data?.profile_img || "/logo.png";
  const nickname = data?.nickname || "Guest";

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
      <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden bg-white">
        <Image src={profileImg} alt="profile" layout="fill" objectFit="cover" />
      </div>
      <div className="ml-4">
        <strong className="text-2xl">{nickname}</strong>
        <div className="space-x-2">
          <SmallButton>정보수정</SmallButton>
          <SmallButton onClick={handleLogout}>로그아웃</SmallButton>
        </div>
      </div>
    </HeaderSection>
  );
};

export default ClubsHeader;
