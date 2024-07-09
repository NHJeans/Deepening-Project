import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[#8EE23D] font-bold text-2xl">모임 만들기</div>

      <div className="mb-4">
        <div className="font-bold mb-2">모임명</div>
        <input
          placeholder="모임명을 입력해주세요"
          className="border-2 border-gray outline-customGreen rounded w-[270px] h-[32.89px] p-3 text-sm"
        />
      </div>

      <div className="w-[270px]">
        <div className="font-bold mb-2">커버사진 등록</div>
        <input type="file" placeholder="클릭 혹은 사진을 이곳에 드롭하세요" />
        <div className="text-[#939393] text-sm m-2">* 미등록시 기본 이미지가 제공됩니다.</div>
      </div>

      <div>
        <button className="font-bold rounded-[8px] bg-customGreen text-white w-[270px] h-[34px]">모임 등록</button>
      </div>
    </div>
  );
};

export default page;
