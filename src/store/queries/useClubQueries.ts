import { fetchClubs, FetchClubsResponse } from "@/apis/fetchClubs";
import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";

export const useInfiniteFetchClubs = (limit = 12): UseInfiniteQueryResult<InfiniteData<FetchClubsResponse>, Error> => {
  return useInfiniteQuery<FetchClubsResponse, Error>({
    queryKey: ["clubs"],
    queryFn: ({ pageParam = 0 }) => fetchClubs({ pageParam: pageParam as number, limit }),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
    initialPageParam: 0,
  });
};
