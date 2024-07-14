"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import DragDrop from "../create/_components/DragDrop";
import LargeButton from "@/components/Button/LargeButton";
import CreateClubSection from "./_components/CreateClubSection";

const CreateClub = () => {
  const [club, setClub] = useState("");
  const [file, setFile] = useState<File>();
  const supabase = createClient();
  const router = useRouter();

  const defaultImgUrl =
    "https://saayznmhcfprtrehndli.supabase.co/storage/v1/object/public/DeepeningProject/DefaultCardImage.png";

  const createClubHandler = async () => {
    if (!club) {
      alert("모임명을 입력해주세요");
      return;
    }
    let imageUrl = { publicUrl: "" };
    if (file) {
      const filename = `${Date.now()}.jpg`;
      await supabase.storage.from("DeepeningProject").upload(filename, file);
      const { data } = supabase.storage.from("DeepeningProject").getPublicUrl(filename);
      imageUrl = data;
    }
    const { data, error } = await supabase.from("Clubs").insert([
      {
        title: club,
        thumbnail: file ? imageUrl.publicUrl : defaultImgUrl,
        user_id: "d5dca952-6c07-4f54-9fe7-bc587b5f9c46",
      },
    ]);
    if (data) alert("모임 등록에 실패하였습니다.");
    else {
      alert("모임이 성공적으로 등록되었습니다.");
      router.push("/clubs");
    }
  };

  return (
    <CreateClubSection club={club} setClub={setClub}>
      <DragDrop setFile={setFile} />
      <LargeButton onClick={createClubHandler}>모임 등록</LargeButton>
    </CreateClubSection>
  );
};

export default CreateClub;
