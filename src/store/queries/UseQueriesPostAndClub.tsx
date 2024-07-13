import fetchClubData from "@/apis/fetchClubData";
import fetchPost from "@/apis/fetchPost";
import { useQueries, UseQueryResult } from "@tanstack/react-query";

const useQueriesPostAndClub = (postId: string, clubId: string) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["post", postId],
        queryFn: () => fetchPost(postId, clubId),
      },
      {
        queryKey: ["club", clubId],
        queryFn: () => fetchClubData(clubId),
      },
    ],
  }) as UseQueryResult<any, Error>[];

  const [postResult, clubResult] = queries;

  return { postResult, clubResult };
};

export default useQueriesPostAndClub;
