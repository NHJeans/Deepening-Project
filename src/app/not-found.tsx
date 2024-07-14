import LoadingFloater from "@/components/Loading/LoadingFloater";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center gap-y-4">
      <LoadingFloater />
      <p className="text-2xl font-bold">Not-Found</p>
      <p>페이지가 존재하지 않습니다</p>
      <Link href="/">
        <button className="px-3 py-2 rounded bg-customGreen text-white font-bold">홈으로 가기</button>
      </Link>
    </section>
  );
};

export default NotFound;
