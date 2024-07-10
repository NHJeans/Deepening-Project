"use client";

import { useClub } from "@/store/queries/useClubQueries";
import { Club } from "@/types/club.type";
import Image from "next/image";

export default function ClubsList() {
  const { data, isLoading, error } = useClub();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>에러~!</div>;
  return (
    <div className="max-h-full overflow-y-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        {data.map((club: Club) => (
          <div key={club.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="relative w-full h-32">
              <Image
                src={club.thumbnail || "/DefaultCardImage.png"}
                alt={club.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h2 className="text-lg font-bold mt-2 truncate">{club.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
