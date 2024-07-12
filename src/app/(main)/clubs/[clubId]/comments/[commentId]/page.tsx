"use client";

import LoadingSpinner from "@/app/(main)/guests/_components/LoadingSpinner";
import { useQueries, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

type Comment = {
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

const CommentDetailPage = ({ params }: { params: { clubId: string; commentId: string } }) => {
  const { commentId, clubId } = params;

  const queryOptions: UseQueryOptions<unknown, Error, unknown>[] = [
    {
      queryKey: ["club", clubId],
      queryFn: async () => {
        const response = await fetch(`/api/clubs/${clubId}/comments`);
        if (!response.ok) {
          throw new Error("네트워크가 불안정합니다");
        }
        return response.json();
      },
    },
    {
      queryKey: ["comment", commentId],
      queryFn: async () => {
        const response = await fetch(`/api/clubs/${clubId}/comments/${commentId}`);
        if (!response.ok) {
          throw new Error("네트워크가 불안정합니다");
        }
        return response.json();
      },
    },
  ];

  const results = useQueries({ queries: queryOptions });

  const [clubResult, commentResult] = results as UseQueryResult<any, Error>[];

  if (clubResult.isPending || commentResult.isPending) {
    return <LoadingSpinner />;
  }

  const comment: Comment = commentResult.data[0];
  const club: Club = clubResult.data[0];

  if (!comment || !club) {
    return <div>게시글이나 모임 정보가 없습니다.</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen pb-20">
      <h1 className="font-black text-xl self-start ml-10 pb-3">{`${club.title}님의 모임`}</h1>
      <div className="my-4 flex items-start mr-12 pl-9 pb-4">
        <input
          id="nickname"
          value={comment.nickname}
          readOnly
          className="w-1/5 mr-2  bg-customYellow border-b border-gray-300 outline-none text-black-500 "
        />
        <span className="mr-2 font-bold">님의</span>
        <div className="w-1/5  bg-customGreen border rounded-md text-white shadow-md text-center">
          {comment.category}
        </div>
      </div>
      <div
        style={{ backgroundColor: comment.bg_image ?? "transparent", backgroundImage: 'url("/logo.png")' }}
        className="w-4/5 p-2 border border-gray-300 rounded-md min-h-[40rem] resize-none shadow-xl bg-no-repeat bg-[length:4rem_4rem] bg-right-bottom"
      >
        <h2 className="text-2xl  mb-4">{comment.content}</h2>
      </div>
    </section>
  );
};

export default CommentDetailPage;
