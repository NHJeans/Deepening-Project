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
      const response = await fetch(`/api/guests/${id}/postdetail/${post_id}`); // 데이터 읽어오는건 잘됨
      // const response = await fetch(`/api/guests/${id}/postdetail${post_id}`);
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
    <div style={{ backgroundColor: post.bg_image ?? "transparent" }} className="p-4 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">{post.content}</h1>
      <p className="text-lg mb-2">카테고리: {post.category}</p>
      <p className="text-lg mb-2">작성자: {post.nickname}</p>
      <p className="text-lg mb-2">클럽 ID: {post.club_id}</p>
    </div>
  );
};

export default PostDetailPage;
