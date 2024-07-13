import fetchClubData from "@/apis/fetchClubData";
import fetchComment from "@/apis/fetchComment";
import { useQueries, UseQueryResult } from "@tanstack/react-query";

const useQueriesClubAndComment = (commentId: string, clubId: string) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["comment", commentId] as const,
        queryFn: () => fetchComment(clubId, commentId),
      },
      {
        queryKey: ["club", clubId] as const,
        queryFn: () => fetchClubData(clubId),
      },
    ],
  }) as UseQueryResult<any, Error>[];

  const [commentResult, clubResult] = queries;

  return { commentResult, clubResult };
};

export default useQueriesClubAndComment;
