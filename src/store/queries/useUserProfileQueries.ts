import { fetchUserProfile } from "@/apis/fetchUserProfile";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile =  () => {
  return useQuery({
    queryKey: ["userprofile"],
    queryFn: () => fetchUserProfile(),
  });
};
