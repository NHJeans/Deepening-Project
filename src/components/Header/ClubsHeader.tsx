import React from "react";
import ButtonSm from "../Button/ButtonSm";

const ClubsHeader = () => {
  return (
    <div className="flex pt-[80px] pl-[40px]">
      <img src="logo.png" alt="logo" className="w-10" />
      <div>
        <strong>닉네임</strong>
        <div>
          <ButtonSm>정보수정</ButtonSm>
          <ButtonSm>로그아웃</ButtonSm>
        </div>
      </div>
    </div>
  );
};

export default ClubsHeader;
