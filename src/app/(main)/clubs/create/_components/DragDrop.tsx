import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface DragDropType {
  setFile: (file: File) => void;
}

const DragDrop = ({ setFile }: DragDropType) => {
  const [inputImage, setInputimage] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const avatarFile = acceptedFiles[0];
    setFile(avatarFile);
    let reader = new FileReader();
    reader.readAsDataURL(avatarFile);
    reader.onloadend = () => {
      setInputimage(reader.result as string);
    };
  }, [setFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
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
              <Image src={"/empty-image.png"} alt="빈 이미지" width="60" height="60" />
              <p className="font-bold mt-3">클릭 혹은 사진을 이곳에 드롭하세요.</p>
              <p className="mt-1 text-sm">사진 당 최대 5MB</p>
            </div>
          )}
        </div>
      )}
      <div className="text-[#939393] text-xs mt-3">* 미등록 시 기본 이미지가 제공됩니다.</div>
    </div>
  );
};

export default DragDrop;
