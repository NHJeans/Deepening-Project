import shareIcon from "@/public/icons/share.png";
import Image from "next/image";

type RelocationAndShareButtonsProps = {
  isRelocating: boolean;
  handleRelocate?: boolean;
  viewMode?: string;
  handleRelocationToggle: () => void;
  handleClickShareButton: () => void;
};

const RelocationAndShareButtons = ({
  isRelocating,
  handleRelocate,
  viewMode,
  handleRelocationToggle,
  handleClickShareButton,
}: RelocationAndShareButtonsProps) => {
  return (
    <div className="flex h-[9%] items-center justify-center gap-2">
      {handleRelocate && (
        <button
          className={`rounded px-16 py-2 font-semibold text-white transition-opacity duration-200 ${
            viewMode !== "grid" ? "bg-gray-300 cursor-not-allowed opacity-80" : "bg-customGreen hover:opacity-90"
          }`}
          disabled={viewMode !== "grid"}
          onClick={handleRelocationToggle}
        >
          {isRelocating ? "배치 완료" : "재배치(pc 전용)"}
        </button>
      )}
      <button
        className="cursor-pointer rounded bg-customGreen p-2 font-semibold text-white hover:opacity-90"
        onClick={handleClickShareButton}
      >
        <Image src={shareIcon} alt="공유하기" />
      </button>
    </div>
  );
};

export default RelocationAndShareButtons;
