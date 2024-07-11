import { fetchClubs } from "@/apis/fetchClubs";
import { useQuery } from "@tanstack/react-query";

export const useClub = () => {
  return useQuery({
    queryKey: ["clubs"],
    queryFn: () => fetchClubs(),
  });
};
