"use client";

import React, { useRef, useState } from "react";
import SmallButton from "../Button/SmallButton";
import { updateUserNickname } from "@/apis/updateUserNickname";

interface EditNicknameProps {
  currentNickname: string;
  onChangeNickname: (newNickname: string) => void;
  onCancel: () => void;
}

const EditNickname = ({ currentNickname, onChangeNickname, onCancel }: EditNicknameProps) => {
  const nicknameRef = useRef<HTMLInputElement>(null);

  const handleNicknameSubmit = async () => {
    if (nicknameRef.current) {
      const newNickname = nicknameRef.current.value;

      if (newNickname.length > 1) {
        alert("닉네임은 최소 2글자 이상이어야 합니다.");
        return;
      }
      try {
        await updateUserNickname(newNickname);
        onChangeNickname(newNickname);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("닉네임 업데이트 중 오류가 발생했습니다.");
        }
      }
    }
  };

  return (
    <div>
      <input type="text" defaultValue={currentNickname} ref={nicknameRef} className=" mb-2" />
      <div className="space-x-2">
        <SmallButton onClick={handleNicknameSubmit}>저장</SmallButton>
        <SmallButton onClick={onCancel}>취소</SmallButton>
      </div>
    </div>
  );
};

export default EditNickname;
