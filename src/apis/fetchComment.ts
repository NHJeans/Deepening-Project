const fetchComment = async (clubId: string, commentId: string) => {
  const response = await fetch(`/api/clubs/${clubId}/comments/${commentId}`);
  if (!response.ok) {
    throw new Error("데이터를 불러올 수 없습니다");
  }
  return response.json();
};

export default fetchComment;
