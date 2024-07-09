import React from "react";
import Link from "next/link";

const CreateClubButton = () => {
  return (
    <Link href="/clubs/create" passHref>
      <button className="bg-transparent border border-black text-white rounded-lg px-4 py-2">모임 생성</button>
    </Link>
  );
};

export default CreateClubButton;
