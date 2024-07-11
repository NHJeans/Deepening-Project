"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

type Post = {
  content: string;
  category: string;
  bg_image?: string | null;
  club_id: number;
  nickname: string;
};

const PostDetailPage = ({ params }: { params: { id: string; post_id: string } }) => {
  // const { post_id } = params;
  const { id, post_id } = params;
  console.log("🚀 ~ PostDetailPage ~ id:", post_id);

  const {
    data: postData,
    isPending,
    error,
  } = useQuery<Post[], Error, Post[], [string, string]>({
    queryKey: ["posts", post_id],
    queryFn: async () => {
      const response = await fetch(`/api/guests/${id}/postdetail/${post_id}`);

      if (!response.ok) {
        throw new Error("네트워크가 불안정합니다");
      }
      return response.json();
    },
  });
  if (isPending) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image src="/logo.png" alt="Loading..." width={256} height={256} className="mb-4 animate-rotate" />
        <p className="text-xl font-semibold">불러오는 중..</p>
      </div>
    );
  }

  if (error) {
    return <div>무언가 잘못되었습니다: {error.message}</div>;
  }

  if (!postData || postData.length === 0) {
    return <div>게시글이 없습니다.</div>;
  }

  const post = postData[0];
  console.log("🚀 ~ PostDetailPage ~ post:", post);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen pb-20">
      <h1 className="font-black self-start ml-10">{`님의 모임`}</h1>
      <div className="my-7 flex items-start mr-12">
        <input
          id="nickname"
          value={post.nickname}
          readOnly
          className="w-1/5 mr-2  bg-customYellow border-b border-gray-300 outline-none placeholder-gray-500 "
        />
        <span className="mr-4 font-bold">님의</span>
        <div className="w-1/5 bg-customGreen border rounded-md text-white shadow-md text-center">{post.category}</div>
      </div>
      <div
        style={{ backgroundColor: post.bg_image ?? "transparent", backgroundImage: 'url("/logo.png")' }}
        className="w-4/5 p-2 border border-gray-300 rounded-md min-h-140 resize-none shadow-xl bg-no-repeat bg-[length:4rem_4rem] bg-right-bottom"
      >
        <h1 className="text-2xl  mb-4">{post.content}</h1>
      </div>
    </section>
  );
};

export default PostDetailPage;
