import Link from "next/link";

const CreateClubButton = () => {
  return (
    <Link href="/clubs/create" className="flex justify-end pr-4">
      <button className="bg-transparent border border-black text-sm font-semibold rounded-lg px-3 py-0.5 mt-6 mr-3 hover:bg-black hover:text-white transition duration-300 ease-in-out">
        + 모임 생성
      </button>
    </Link>
  );
};

export default CreateClubButton;
