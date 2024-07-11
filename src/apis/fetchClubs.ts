export const fetchClubs = async () => {
  const response = await fetch("/api/clubs");
  if (!response.ok) {
    throw new Error("네트워크 응답에 문제가 있습니다.");
  }
  return response.json();
};
