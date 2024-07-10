import { selectPlantImg } from "@/utils/selectPlantImg";
import Image from "next/image";

interface CommentListItemProps {
  comment: {
    id: number;
    category: string;
    nickname: string;
    content: string;
  };
}

const CommentListItem = ({ comment }: CommentListItemProps) => {
  return (
    <>
      <div className="flex flex-row items-center px-12 py-6 gap-4">
        <Image src={selectPlantImg(comment.category)} alt={comment.category} width={50} height={50} priority />
        <div className="flex flex-col gap-1 mt-1">
          <h2 className="font-semibold">{`${comment.nickname}님의 ${comment.category}`}</h2>
          <h4 className="text-sm truncate max-w-60">{comment.content}</h4>
        </div>
      </div>
      <hr className="border-gray-300" />
    </>
  );
};

export default CommentListItem;
