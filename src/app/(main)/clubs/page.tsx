import { fetchClubs } from "@/apis/fetchClubs";
import CreateClubButton from "@/components/Button/CreateClubButton";
import ClubsList from "@/components/Club/ClubList";
import ClubsHeader from "@/components/Header/ClubsHeader";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ClubListPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["clubs"],
    queryFn: () => fetchClubs({ pageParam: 0 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="h-screen flex flex-col">
        <ClubsHeader />
        <CreateClubButton />
        <h2 className="text-2xl font-bold p-4">모임들</h2>
        <div className="flex-grow overflow-hidden">
          <ClubsList />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default ClubListPage;
