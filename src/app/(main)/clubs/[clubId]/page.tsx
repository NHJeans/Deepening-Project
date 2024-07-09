"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { selectPlantImg } from "@/utils/selectPlantImg";

import { Comment } from "@/types/comment.type";

const ClubDetailPage = ({ params }: { params: { id: string } }) => {
  const [commentList, setCommentList] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchCommentData = async () => {
      const response = await fetch("http://localhost:3000/api/clubs");
      const data: Comment[] = await response.json();
      setCommentList(data);
    };

    fetchCommentData();
  }, []);

  console.log(commentList);

  return (
    <section className="h-full w-full p-8">
      <div className="flex h-[15%] bg-white">
        <h1>clubDetailPage2</h1>
      </div>
      <div className="flex">
        <ul>
          {commentList.map((comment) => (
            <li key={comment.id} className="flex flex-col items-center justify-center">
              <Image src={selectPlantImg(comment.category)} alt={comment.category} width={100} height={100} />
              <h3 className="text-sm">{`${comment.nickname}님의 ${comment.category}`}</h3>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex h-[10%] items-center justify-center">
        <button className="cursor-pointer rounded bg-[#95EB42] px-24 py-2 font-semibold text-white hover:opacity-90">
          공유하기
        </button>
      </div>
    </section>
  );
};

export default ClubDetailPage;
