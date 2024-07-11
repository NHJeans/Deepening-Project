"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import SmallButton from "../Button/SmallButton";
import HeaderSection from "./HeaderSection";
import { useUserProfile } from "@/store/queries/useUserProfileQueries";
import Image from "next/image";
import SkeletonHeader from "./SkeletonHeader";
import EditNickname from "./EditNickname";

const ClubsHeader = () => {
  const { data, isLoading, error } = useUserProfile();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (data?.nickname) {
      setNickname(data.nickname);
    }
  }, [data]);

  const profileImg = useMemo(() => data?.profile_img || "/logo.png", [data]);

  if (isLoading) {
    return <SkeletonHeader />;
  }
  if (error) {
    return <div>Error</div>;
  }

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

  const handleNicknameChange = (newNickname: string) => {
    setNickname(newNickname);
    setIsEditing(false);
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <HeaderSection>
      <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden bg-white">
        <Image src={profileImg} alt="profile" width={60} height={60} objectFit="cover" className="rounded-full" />
      </div>
      <div className="ml-4">
        {isEditing ? (
          <EditNickname
            currentNickname={nickname}
            onChangeNickname={handleNicknameChange}
            onCancel={handleCancelEdit}
          />
        ) : (
          <>
            <strong className="text-2xl" onClick={() => setIsEditing(true)}>
              {nickname}
            </strong>
            <div className="space-x-2">
              <SmallButton onClick={() => setIsEditing(true)}>정보수정</SmallButton>
              <SmallButton onClick={handleLogout}>로그아웃</SmallButton>
            </div>
          </>
        )}
      </div>
    </HeaderSection>
  );
};

export default ClubsHeader;
