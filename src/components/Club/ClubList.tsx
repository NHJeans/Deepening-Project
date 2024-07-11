"use client";

import { useClub } from "@/store/queries/useClubQueries";
import { Club } from "@/types/club.type";
import Image from "next/image";

export function ClubsList() {
  const { data, error } = useClub();

  if (error) {
    return <div>에러~!</div>;
  }
  return (
    <div className="max-h-full overflow-y-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        {data?.map((club: Club) => {
          const imageUrl = club.thumbnail || "/Default-Card-Image.png";
          return (
            <div key={club.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="relative w-full h-32">
                <Image
                  src={imageUrl}
                  alt={club.title}
                  width={100}
                  height={100}
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
              <h2 className="text-lg font-bold mt-2 truncate">{club.title}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ClubsList;
