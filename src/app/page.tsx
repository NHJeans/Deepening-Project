"use client";

import Link from "next/link";
import Image from "next/image";
import LargeButton from "@/components/Button/LargeButton";
import LoadingFloater from "@/components/Loading/LoadingFloater";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-customYellow">
      <Image src="/logos/title-logo.png" alt="어땠어?" width={250} height={150} className="mb-12" />
      <LoadingFloater />
      <Link href="/auth">
        <LargeButton>시작하기</LargeButton>
      </Link>
    </div>
  );
}
