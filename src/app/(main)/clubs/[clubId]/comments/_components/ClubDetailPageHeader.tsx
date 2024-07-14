import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import gridImg from "../../../../../../../public/icons/grid-filled.png";
import listImg from "../../../../../../../public/icons/list-lined.png";
import ClubTitle from "./ClubTitle";

interface ClubDetailPageHeaderProps {
  id: string;
  setViewMode: Dispatch<SetStateAction<string>>;
}

const ClubDetailPageHeader = ({ id, setViewMode }: ClubDetailPageHeaderProps) => {
  return (
    <>
      <ClubTitle clubId={id} />
      <div className="absolute flex gap-1 bottom-0 right-0 m-4">
        <button
          className="w-6 h-6 rounded bg-customGreen cursor-pointer hover:brightness-90 active:opacity-85"
          type="button"
          onClick={() => setViewMode("grid")}
        >
          <Image src={gridImg} alt="grid" priority />
        </button>
        <button
          className="w-6 h-6 rounded bg-customGreen cursor-pointer hover:brightness-95 active:opacity-85"
          type="button"
          onClick={() => setViewMode("list")}
        >
          <Image src={listImg} alt="list" priority />
        </button>
      </div>
    </>
  );
};

export default ClubDetailPageHeader;
