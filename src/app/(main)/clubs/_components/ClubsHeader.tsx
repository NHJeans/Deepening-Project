"use client";

import SmallButton from "@/commons/Button/SmallButton";
import HeaderSection from "@/commons/Header/HeaderSection";
import SkeletonHeader from "@/commons/Header/SkeletonHeader";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useUserStore } from "@/store";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EditNickname from "./EditNickname";

const ClubsHeader = () => {
  useUserProfile();
  const { user, isLoggedIn, clearUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (user?.nickname) {
      setNickname(user.nickname);
    }
  }, [user]);

  if (!isLoggedIn) {
    return <SkeletonHeader />;
  }
  const profileImg = user?.profile_img || "/logo.png";

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });
      clearUser();
      router.push("/");
    } else {
      console.error("로그아웃 실패:", error.message);
    }
  };

  const handleNicknameChange = (newNickname: string) => {
    setNickname(newNickname);
    user!.nickname = newNickname;
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
