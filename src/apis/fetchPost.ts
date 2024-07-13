const fetchPost = async (postId: string, clubId: string) => {
  const response = await fetch(`/api/guests/${clubId}/postdetail/${postId}`);
  if (!response.ok) {
    throw new Error("데이터를 불러올 수 없습니다");
  }
  return response.json();
};

export default fetchPost;
