"use client";

import LargeButton from "@/components/Button/LargeButton";
import { useUserStore } from "@/store";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import DragDrop from "../create/_components/DragDrop";
import CreateClubSection from "./_components/CreateClubSection";
import { useModal } from "@/context/modal.context";

const CreateClub = () => {
  const [club, setClub] = useState("");
  const [file, setFile] = useState<File>();
  const [clubError, setClubError] = useState<string>("");
  const supabase = createClient();
  const { user } = useUserStore();
  const modal = useModal();
  const defaultImgUrl =
    "https://saayznmhcfprtrehndli.supabase.co/storage/v1/object/public/DeepeningProject/DefaultCardImage.png";

  const clubRequire = (message: string, link: string) => {
    modal.open({
      title: message,
      content: <></>,
      path: link,
    });
  };

  const createClubHandler = async () => {
    if (!club) {
      setClubError("모임명을 입력해 해주세요.");
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
        user_id: user?.id,
      },
    ]);
    if (data) clubRequire("모임 등록에 실패하였습니다.", "/clubs/create");
    else clubRequire("모임이 성공적으로 등록되었습니다.", "/clubs");
  };

  return (
    <CreateClubSection club={club} setClub={setClub} clubError={clubError}>
      <DragDrop setFile={setFile} />
      <LargeButton onClick={createClubHandler}>모임 등록</LargeButton>
    </CreateClubSection>
  );
};

export default CreateClub;
