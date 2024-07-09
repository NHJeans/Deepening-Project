import React from "react";

const page = () => {
  return (
    <div>
      <div className="text-[#8EE23D] font-bold">모임 만들기</div>
      <div className="font-bold">모임명</div>
      <input
        placeholder="모임명을 입력해주세요"
        className="border-2 border-customGreen
       outline-customGreen rounded
       w-[270px] h-[32.89px]"
      />
      <div className="font-bold">커버사진 등록</div>
      <input type="file" placeholder="클릭 혹은 사진을 이곳에 드롭하세요" />
      <div className="text-[#939393]">* 미등록시 기본 이미지가 제공됩니다.</div>
      <button className="font-bold rounded-[8px] bg-customGreen text-white w-[270px] h-[34px]">모임 등록</button>
    </div>
  );
};

export default page;
