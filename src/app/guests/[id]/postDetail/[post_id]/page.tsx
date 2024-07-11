"use client";

import { useQueries, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

type Post = {
  content: string;
  category: string;
  bg_image?: string | null;
  club_id: number;
  nickname: string;
};

type Club = {
  id: number;
  title: string;
};

const PostDetailPage = ({ params }: { params: { id: string; post_id: string } }) => {
  // const { post_id } = params;
  const { id, post_id } = params;
  console.log("🚀 ~ PostDetailPage ~ id:", post_id);

  const queryOptions: UseQueryOptions<any, Error, any, [string, string]>[] = [
    {
      queryKey: ["post", post_id],
      queryFn: async () => {
        const response = await fetch(`/api/guests/${id}/postdetail/${post_id}`);
        if (!response.ok) {
          throw new Error("네트워크가 불안정합니다");
        }
        return response.json();
      },
    },
    {
      queryKey: ["club", id],
      queryFn: async () => {
        const response = await fetch(`/api/guests/${id}`);
        if (!response.ok) {
          throw new Error("네트워크가 불안정합니다");
        }
        return response.json();
      },
    },
  ];

  const results = useQueries({ queries: queryOptions });

  const [postResult, clubResult] = results as UseQueryResult<any, Error>[];
  if (postResult.isLoading || clubResult.isLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image src="/logo.png" alt="Loading..." width={256} height={256} className="mb-4 animate-rotate" />
        <p className="text-xl font-semibold">불러오는 중..</p>
      </div>
    );
  }

  if (postResult.error || clubResult.error) {
    return <div>무언가 잘못되었습니다: {postResult.error?.message || clubResult.error?.message}</div>;
  }

  const post: Post = postResult.data[0];
  const club: Club = clubResult.data[0];

  if (!post || !club) {
    return <div>게시글이나 모임 정보가 없습니다.</div>;
  }

  console.log("🚀 ~ PostDetailPage ~ post:", post);
  console.log("🚀 ~ PostDetailPage ~ club:", club);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen pb-20">
      <h1 className="font-black self-start ml-10">{`${club.title}님의 모임`}</h1>
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
      <ul className="pt-10">
        <Link
          href={`/clubs/${id}/comments`}
          className=" bg-customGreen border rounded-md text-white shadow-md text-center p-2 px-10"
        >
          모임 응원글 보러가기
        </Link>
      </ul>
    </section>
  );
};

export default PostDetailPage;
