"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="fixed self-start top-4 m-4">
      <Image src="/icons/back.png" alt="Back" width={24} height={24} />
    </button>
  );
};

export default BackButton;
