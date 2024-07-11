"use client";

import React from "react";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ClubListPage = () => {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
    });

    const result = await response.json();

    if (result.success) {
      clearUser();
      router.push("/");
    } else {
      console.error("Logout failed:", result.error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <div>
          <strong>{user?.nickname ?? "유저 정보가 없습니다"}</strong>
          <div className="space-x-2">
            <button className="bg-gray-300 px-4 py-2 rounded">정보수정</button>
            <button onClick={handleLogout} className="bg-red-300 px-4 py-2 rounded">
              로그아웃
            </button>
          </div>
        </div>
      </header>
      <h1 className="text-2xl font-bold">클럽 목록 페이지</h1>
    </div>
  );
};

export default ClubListPage;
