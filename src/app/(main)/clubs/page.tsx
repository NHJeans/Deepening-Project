"use client";

import React, { useEffect } from "react";
import { useUserStore } from "@/store"; // Zustand store import

const ClubListPage = () => {
  const user = useUserStore((state) => state.user); // Zustand store 사용

  // 상태를 확인하기 위해 콘솔 로그 추가
  useEffect(() => {
    console.log("User state in ClubListPage:", user);
  }, [user]);

  return (
    <div>
      <h1>클럽 목록 페이지</h1>
      {user ? (
        <div>
          <p>유저 ID: {user.id}</p>
          <p>유저 이메일: {user.email}</p>
          <p>유저 닉네임: {user.nickname}</p>
          <p>유저 프로필 이미지: {user.profile_img}</p>
        </div>
      ) : (
        <p>유저 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default ClubListPage;
