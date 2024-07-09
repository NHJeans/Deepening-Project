import ClubsList from "@/components/Club/ClubList";
import ClubsHeader from "@/components/Header/ClubsHeader";
import React from "react";

const ClubListPage = () => {
  return (
    <div>
      <ClubsHeader />
      <ClubsList />
    </div>
  );
};

export default ClubListPage;
