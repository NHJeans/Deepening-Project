"use client";

import LoadingFloater from "@/components/Loading/LoadingFloater";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center gap-y-4">
      <LoadingFloater />
      <p className="text-2xl font-bold">Error Page</p>
      <p>예상치 못한 오류가 발생했습니다.</p>
      <Link href="/">
        <button className="px-3 py-2 rounded bg-customGreen text-white font-bold">홈으로 가기</button>
      </Link>
    </section>
  );
};

export default ErrorPage;
