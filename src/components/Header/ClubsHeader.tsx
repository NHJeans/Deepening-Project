"use client";

import React from "react";
import SmallButton from "../Button/SmallButton";
import HeaderSection from "./HeaderSection";
import { useUserProfile } from "@/store/queries/useUserProfileQueries";
import Image from "next/image";

const ClubsHeader = () => {
  const { data, isLoading, error } = useUserProfile();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user profile</div>;

  const profileImg = data?.profile_img || "/logo.png";
  const nickname = data?.nickname || "Guest";

  return (
    <HeaderSection>
      <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden bg-white">
        <Image src={profileImg} alt="profile" layout="fill" objectFit="cover" />
      </div>
      <div className="ml-4">
        <strong className="text-2xl">{nickname}</strong>
        <div className="space-x-2">
          <SmallButton>정보수정</SmallButton>
          <SmallButton>로그아웃</SmallButton>
        </div>
      </div>
    </HeaderSection>
  );
};

export default ClubsHeader;
