import { selectPlantImg } from "@/utils/selectPlantImg";
import Image from "next/image";

interface CommentItemProps {
  comment: {
    id: number;
    category: string;
    nickname: string;
  };
  position: {
    x: number;
    y: number;
  };
  handleMouseDown: (e: React.MouseEvent, id: number) => void;
}

const CommentGridItem = ({ comment, position, handleMouseDown }: CommentItemProps) => {
  return (
    <div
      className="absolute flex flex-col items-center justify-center w-[150px] h-[170px] cursor-pointer"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        userSelect: "none",
      }}
      onMouseDown={(e) => handleMouseDown(e, comment.id)}
    >
      <div className="relative w-24">
        <Image
          src={selectPlantImg(comment.category)}
          alt={comment.category}
          width={100}
          height={100}
          className="object-cover pointer-events-none"
          priority
        />
      </div>
      <h3 className="w-full absolute bottom-0 text-center text-sm pointer-events-none">{`${comment.nickname}의 ${comment.category}`}</h3>
    </div>
  );
};

export default CommentGridItem;
