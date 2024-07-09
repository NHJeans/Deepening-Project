import React from "react";
import SmallButton from "../Button/SmallButton";
import HeaderSection from "./HeaderSection";

const ClubsHeader = () => {
  return (
    <HeaderSection>
      <img src="logo.png" alt="logo" className="w-10" />
      <div className="ml-4">
        <strong>닉네임</strong>
        <div className="space-x-2">
          <SmallButton>정보수정</SmallButton>
          <SmallButton>로그아웃</SmallButton>
        </div>
      </div>
    </HeaderSection>
  );
};

export default ClubsHeader;
