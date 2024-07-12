import { useQueries, UseQueryResult } from "@tanstack/react-query";

const fetchPost = async (postId: string, clubId: string) => {
  const response = await fetch(`/api/guests/${clubId}/postdetail/${postId}`);
  if (!response.ok) {
    throw new Error("데이터를 불러올 수 없습니다");
  }
  return response.json();
};

const fetchClub = async (clubId: string) => {
  const response = await fetch(`/api/guests/${clubId}`);
  if (!response.ok) {
    throw new Error("데이터를 불러올 수 없습니다");
  }
  return response.json();
};

const useQueriesPostAndClub = (postId: string, clubId: string) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["post", postId],
        queryFn: () => fetchPost(postId, clubId),
      },
      {
        queryKey: ["club", clubId],
        queryFn: () => fetchClub(clubId),
      },
    ],
  }) as UseQueryResult<any, Error>[];

  const [postResult, clubResult] = queries;

  return { postResult, clubResult };
};

export default useQueriesPostAndClub;
