"use client";

import { updateUserNickname } from "@/apis/updateUserNickname";
import SmallButton from "@/components/Button/SmallButton";
import { useModal } from "@/context/modal.context";
import { useRef } from "react";

interface EditNicknameProps {
  currentNickname: string;
  onChangeNickname: (newNickname: string) => void;
  onCancel: () => void;
}

const EditNickname = ({ currentNickname, onChangeNickname, onCancel }: EditNicknameProps) => {
  const nicknameRef = useRef<HTMLInputElement>(null);
  const modal = useModal();

  const handleNicknameSubmit = async () => {
    if (nicknameRef.current) {
      const newNickname = nicknameRef.current.value;

      if (newNickname.length < 2 || newNickname.length > 6) {
        modal.open({
          title: "알림",
          content: "닉네임은 최소 2글자 이상, 6글자 이하로 입력해주세요.",
        });
        return;
      }
      try {
        await updateUserNickname(newNickname);
        onChangeNickname(newNickname);
      } catch (error) {
        if (error instanceof Error) {
          modal.open({
            title: "오류",
            content: error.message,
          });
        } else {
          modal.open({
            title: "오류",
            content: "닉네임 업데이트 중 오류가 발생했습니다.",
          });
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
