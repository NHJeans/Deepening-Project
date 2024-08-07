import { selectPlantImg } from "@/utils/selectPlantImg";
import Image from "next/image";

interface CommentListItemProps {
  comment: {
    id: number;
    category: string;
    nickname: string;
    content: string;
  };
  handleMoveDetail: (clubId: number) => void;
}

const CommentListItem = ({ comment, handleMoveDetail }: CommentListItemProps) => {
  return (
    <>
      <section className="flex flex-row items-center px-12 py-6 gap-4">
        <Image
          src={selectPlantImg(comment.category)}
          alt={comment.category}
          width={50}
          height={50}
          className="cursor-pointer"
          onClick={() => handleMoveDetail(comment.id)}
          priority
        />
        <div className="flex flex-col gap-1 mt-1 cursor-pointer" onClick={() => handleMoveDetail(comment.id)}>
          <h2 className="font-semibold">{`${comment.nickname}님의 ${comment.category}`}</h2>
          <h4 className="text-sm truncate max-w-60">{comment.content}</h4>
        </div>
      </section>
      <hr className="border-gray-300" />
    </>
  );
};

export default CommentListItem;
