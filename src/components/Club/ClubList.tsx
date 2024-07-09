"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchClubs } from "@/apis/fetchClubs";
import { Club } from "@/types/club.type";

export default function ClubsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["clubs"],
    queryFn: () => fetchClubs(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading clubs</div>;

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {data.map((club: Club) => (
        <div key={club.id} className="bg-white p-4 rounded-lg shadow-md">
          <img
            src={club.thumbnail || "/DefaultCardImage.png"}
            alt={club.title}
            className="w-full h-32 object-cover rounded-lg"
          />
          <h2 className="text-lg font-bold mt-2">{club.title}</h2>
        </div>
      ))}
    </div>
  );
}
