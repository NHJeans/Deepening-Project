"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-customYellow">
      <h1 className="text-4xl font-semibold mb-8">어땠어?</h1>
      <Image src="/logo.png" alt="Logo" width={150} height={150} className="mb-8" />
      <Link href="/auth" className="bg-customGreen text-white px-4 py-2 rounded font-semibold">
        시작하기
      </Link>
    </div>
  );
}
