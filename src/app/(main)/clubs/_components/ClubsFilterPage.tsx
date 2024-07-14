"use client";

import { useState } from "react";
import ClubsHeader from "./ClubsHeader";
import CreateClubButton from "./CreateClubButton";
import ClubsList from "./ClubsList";

const ClubsFilterPage = () => {
  const [myClubs, setMyClubs] = useState<boolean>(false);

  const handleFilterMyClubs = () => {
    setMyClubs((prev) => !prev);
  };

  return (
    <div className="h-screen flex flex-col">
      <ClubsHeader filterMyClubs={handleFilterMyClubs} />
      <CreateClubButton />
      <h2 className="text-2xl font-bold p-4">모임들</h2>
      <div className="flex-grow overflow-hidden">
        <ClubsList myClubs={myClubs} />
      </div>
    </div>
  );
};

export default ClubsFilterPage;
