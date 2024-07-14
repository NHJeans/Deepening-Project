import { fetchClubs } from "@/apis/fetchClubs";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import ClubsFilterPage from "./_components/ClubsFilterPage";

const ClubListPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["clubs"],
    queryFn: () => fetchClubs({ pageParam: 0 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClubsFilterPage />
    </HydrationBoundary>
  );
};

export default ClubListPage;
