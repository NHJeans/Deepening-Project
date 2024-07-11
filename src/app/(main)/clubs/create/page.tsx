"use client";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import logo from "../../../../../public/logo.png";
import emptyimage from "../../../../../public/empty-image.png";
import {createClient} from "@/utils/supabase/client"
import { useDropzone } from "react-dropzone";

const CreateClub = () => {
  const [club, setClub] = useState("");
  const [inputImage, setInputimage] = useState<string>("");
  const [file, setFile] = useState<File>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const avatarFile = acceptedFiles[0];
    setFile(avatarFile);
    let reader = new FileReader();
    reader.readAsDataURL(avatarFile);
    reader.onloadend = () => {
      setInputimage(reader.result as string);
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const defaultImgUrl =
    "https://saayznmhcfprtrehndli.supabase.co/storage/v1/object/public/DeepeningProject/DefaultCardImage.png";

  const createClubHandler = async () => {
    if (!club) {
      alert("모임명을 입력해주세요");
      return;
    }
    const supabase = createClient();
    if (!file) {
      const { data, error } = await supabase
        .from("Clubs")
        .insert([{ title: club, thumbnail: defaultImgUrl, user_id: "d5dca952-6c07-4f54-9fe7-bc587b5f9c46" }]);
      data ? alert("모임 등록에 실패하였습니다.") : alert("모임이 성공적으로 등록되었습니다.");
    } else {
      const filename = `${Date.now()}.jpg`;
      await supabase.storage.from("DeepeningProject").upload(filename, file);
      const { data: imageUrl } = supabase.storage.from("DeepeningProject").getPublicUrl(filename);
      const { data, error } = await supabase
        .from("Clubs")
        .insert([{ title: club, thumbnail: imageUrl.publicUrl, user_id: "d5dca952-6c07-4f54-9fe7-bc587b5f9c46" }]);
      data ? alert("모임 등록에 실패하였습니다.") : alert("모임이 성공적으로 등록되었습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Image src={logo} alt="로고" width="151" height="151" className="mb-7 mt-[130px]" />
      <h1 className="text-[#8EE23D] text-2xl mb-5 font-bold">모임 만들기</h1>
      <div className="mb-4">
        <div className="font-bold mb-3">모임명</div>
        <input
          placeholder="모임명을 입력해주세요"
          className="border-2 border-gray outline-customGreen w-[270px] h-[35px] p-3 text-sm rounded-lg"
          value={club}
          onChange={(e) => {
            setClub(e.target.value);
          }}
        />
      </div>
      <div className="w-[270px]">
        <div className="font-bold mb-2">커버 사진 등록</div>
        {inputImage ? (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Image src={inputImage} alt="이미지" width={270} height={221} className="cursor-pointer" />
          </div>
        ) : (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="w-[270px] h-[221px] flex flex-col text-center bg-hover-border-pattern bg-sky-100">
                <p className="mt-[150px] text-sm">이미지를 이곳에 드롭하세요</p>
              </div>
            ) : (
              <div className="w-[270px] h-[221px] flex flex-col items-center justify-center bg-border-pattern cursor-pointer">
                <Image src={emptyimage} alt="빈 이미지" width="60" height="60" />
                <p className="font-bold mt-3">클릭 혹은 사진을 이곳에 드롭하세요.</p>
                <p className="mt-1 text-sm">사진 당 최대 5MB</p>
              </div>
            )}
          </div>
        )}
        <div className="text-[#939393] text-xs mt-3">* 미등록 시 기본 이미지가 제공됩니다.</div>
      </div>
      <div>
        <button
          className="font-bold rounded-lg bg-customGreen text-white w-[270px] h-[34px] mt-3"
          onClick={createClubHandler}
        >
          모임 등록
        </button>
      </div>
    </div>
  );
};

export default CreateClub;
