import { useQueries, UseQueryResult } from "@tanstack/react-query";

const fetchClub = async (clubId: string) => {
  const response = await fetch(`/api/guests/${clubId}`);
  if (!response.ok) {
    throw new Error("데이터를 불러올 수 없습니다");
  }
  return response.json();
};

const fetchComment = async (clubId: string, commentId: string) => {
  const response = await fetch(`/api/clubs/${clubId}/comments/${commentId}`);
  if (!response.ok) {
    throw new Error("데이터를 불러올 수 없습니다");
  }
  return response.json();
};

const useQueriesClubAndComment = (commentId: string, clubId: string) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["comment", commentId] as const,
        queryFn: () => fetchComment(clubId, commentId),
      },
      {
        queryKey: ["club", clubId] as const,
        queryFn: () => fetchClub(clubId),
      },
    ],
  }) as UseQueryResult<any, Error>[];

  const [commentResult, clubResult] = queries;

  return { commentResult, clubResult };
};

export default useQueriesClubAndComment;
