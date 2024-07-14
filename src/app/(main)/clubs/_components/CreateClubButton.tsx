import Link from "next/link";

const CreateClubButton = () => {
  return (
    <Link href="/clubs/create" className="flex justify-end pr-4">
      <button className="bg-transparent border-2 border-customGreen text-black rounded-lg px-3 mt-6 mr-3 hover:bg-white">
        + 모임 생성
      </button>
    </Link>
  );
};

export default CreateClubButton;
