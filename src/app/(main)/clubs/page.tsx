import CreateClubButton from "@/components/Button/CreateClubButton";
import ClubsList from "@/components/Club/ClubList";
import ClubsHeader from "@/components/Header/ClubsHeader";
import React from "react";

const ClubListPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <ClubsHeader />
      <CreateClubButton />
      <h2 className="text-2xl font-bold p-4">모임들</h2>
      <div className="flex-grow overflow-hidden">
        <ClubsList />
      </div>
    </div>
  );
};

export default ClubListPage;
