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
  handleMouseDown: (e: React.MouseEvent, id: string) => void;
}

const CommentGridItem = ({ comment, position, handleMouseDown }: CommentItemProps) => {
  return (
    <div
      className="absolute flex flex-col items-center justify-center w-[130px] h-[170px] cursor-pointer"
      onMouseDown={(e) => handleMouseDown(e, comment.id.toString())}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <Image src={selectPlantImg(comment.category)} alt={comment.category} width={100} height={100} priority />
      <h3 className="w-full absolute bottom-0 text-center text-sm">{`${comment.nickname}님의 ${comment.category}`}</h3>
    </div>
  );
};

export default CommentGridItem;
