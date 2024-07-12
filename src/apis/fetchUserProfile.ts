export const fetchUserProfile = async () => {
  const response = await fetch("/api/auth/profile");
  if (!response.ok) {
    throw new Error("네트워크 응답에 문제가 있습니다.");
  }
  return response.json();
};
