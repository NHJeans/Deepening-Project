import { Club } from "@/types/club.type";
import { useQuery } from "@tanstack/react-query";

const useQueryClubs = (id: string) => {
  const {
    data: clubData,
    isPending,
    error,
  } = useQuery<Club[], Error, Club[]>({
    queryKey: ["clubs", id],
    queryFn: async () => {
      const response = await fetch(`/api/guests/${id}`);
      if (!response.ok) {
        throw new Error("데이터를 불러올 수 없습니다");
      }
      return response.json();
    },
  });

  return { clubData, isPending, error };
};

export default useQueryClubs;
