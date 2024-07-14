import { Club } from "@/types/club.type";

export interface FetchClubsResponse {
  data: Club[];
  nextPage: number;
  hasMore: boolean;
}

export const fetchClubs = async ({
  pageParam = 0,
  limit = 12,
}: {
  pageParam?: number;
  limit?: number;
}): Promise<FetchClubsResponse> => {
  const response = await fetch(`/api/clubs?limit=${limit}&offset=${pageParam}`);
  if (!response.ok) {
    throw new Error("네트워크 응답에 문제가 있습니다.");
  }
  const data = (await response.json()) as Club[];
  return { data, nextPage: pageParam + limit, hasMore: data.length === limit };
};
