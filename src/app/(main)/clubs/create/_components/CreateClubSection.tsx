import Image from "next/image";
import React from "react";

interface CreateClubSectionProps {
  children: React.ReactNode;
  club: string;
  setClub: React.Dispatch<React.SetStateAction<string>>;
}

const CreateClubSection = ({ children, club, setClub }: CreateClubSectionProps) => {
  return (
    <div className="flex flex-col items-center">
      <Image src={"/logo.png"} alt="로고" width="151" height="151" className="mb-7 mt-[130px]" />
      <h1 className="text-[#8EE23D] text-2xl mb-5 font-bold">모임 만들기</h1>
      <div className="mb-4">
        <div className="font-bold mb-3">모임명</div>
        <input
          placeholder="모임명을 입력해주세요"
          className="border-2 border-gray outline-customGreen w-[270px] h-[35px] p-3 text-sm rounded-lg"
          value={club}
          onChange={(e) => {
            setClub(e.target.value);
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default CreateClubSection;
