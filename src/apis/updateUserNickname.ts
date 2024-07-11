export const updateUserNickname = async (newNickname: string) => {
  const response = await fetch("/api/user/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickname: newNickname }),
  });

  if (!response.ok) {
    throw new Error("닉네임 업데이트에 실패했습니다.");
  }
};
