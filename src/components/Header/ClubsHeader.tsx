import React from "react";
import ButtonSm from "../Button/ButtonSm";
import HeaderSection from "./HeaderSection";

const ClubsHeader = () => {
  return (
    <HeaderSection>
      <img src="logo.png" alt="logo" className="w-10" />
      <div className="ml-4">
        <strong>닉네임</strong>
        <div className="space-x-2">
          <ButtonSm>정보수정</ButtonSm>
          <ButtonSm>로그아웃</ButtonSm>
        </div>
      </div>
    </HeaderSection>
  );
};

export default ClubsHeader;
