"use client";

import LoadingSpinner from "@/components/Loading/ClubsLoadingSpinner";
import { useUserStore } from "@/store";
import { useInfiniteFetchClubs } from "@/store/queries/useClubQueries";
import { Club } from "@/types/club.type";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";

const ClubsList = ({ myClubs }: { myClubs: boolean }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteFetchClubs();
  const { user } = useUserStore();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastClubRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );
  const allClubs = data?.pages.flatMap((page) => page.data) || [];
  const filteredClubs = myClubs ? allClubs.filter((club) => club.user_id === user?.id) : allClubs;

  return (
    <div className="max-h-full overflow-y-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        {filteredClubs.map((club: Club, index: number) => {
          const imageUrl = club.thumbnail || "/Default-Card-Image.png";
          const isLastClub = allClubs.length - 1 === index;
          return (
            <Link key={club.id} href={`/clubs/${club.id}/comments`}>
              <div key={club.id} ref={isLastClub ? lastClubRef : null} className="bg-white p-4 rounded-lg shadow-md">
                <div className="relative w-full h-32">
                  <Image src={imageUrl} alt={club.title} layout="fill" objectFit="cover" className="rounded-lg" />
                </div>
                <h2 className="text-lg font-bold mt-2 truncate">{club.title}</h2>
              </div>
            </Link>
          );
        })}
      </div>
      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
};

export default ClubsList;
