"use client";

import LoadingSpinner from "@/app/(main)/guests/_components/LoadingSpinner";
import useQueriesClubAndComment from "@/store/queries/useQueriesClubAndComments";

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

  const { commentResult, clubResult } = useQueriesClubAndComment(commentId, clubId);

  if (commentResult.isLoading || clubResult.isLoading) {
    return <LoadingSpinner />;
  }

  if (commentResult.error || clubResult.error) {
    return <p>정보를 읽어올 수 없습니다 {commentResult.error?.message || clubResult.error?.message}</p>;
  }

  const comment: Comment = commentResult.data[0];
  const club: Club = clubResult.data[0];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen pb-10">
      <h1 className="font-black text-xl self-start ml-10 pb-3">{`${club.title}님의 모임`}</h1>
      <section className="my-4 flex items-start mr-12 pl-9 pb-4">
        <input
          id="nickname"
          value={comment.nickname}
          readOnly
          className="w-1/5 mr-2 bg-customYellow border-b border-gray-300 outline-none"
        />
        <span className="mr-2 font-bold">님의</span>
        <div className="w-1/5 bg-customGreen border rounded-md text-white shadow-md text-center">
          {comment.category}
        </div>
      </section>
      <div
        style={{ backgroundColor: comment.bg_image ?? "white", backgroundImage: 'url("/logo.png")' }}
        className="w-4/5 p-2 border border-gray-300 rounded-md min-h-[35rem] resize-none shadow-xl bg-no-repeat bg-[length:4rem_4rem] bg-right-bottom"
      >
        <h2 className="text-base mb-4">{comment.content}</h2>
      </div>
    </main>
  );
};

export default CommentDetailPage;
