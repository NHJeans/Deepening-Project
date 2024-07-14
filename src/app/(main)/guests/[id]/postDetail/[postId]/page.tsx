"use client";

import Link from "next/link";
import useFetchPostAndClub from "../../../../../../store/queries/UseQueriesPostAndClub";
import LoadingSpinner from "../../../_components/LoadingSpinner";

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

const PostDetailPage = ({ params }: { params: { id: string; postId: string } }) => {
  const { id, postId } = params;

  const { postResult, clubResult } = useFetchPostAndClub(postId, id);

  if (postResult.isPending || clubResult.isPending) {
    return <LoadingSpinner />;
  }

  if (postResult.error || clubResult.error) {
    return <p>정보를 읽어올 수 없습니다 {postResult.error?.message || clubResult.error?.message}</p>;
  }

  const post: Post = postResult.data[0];
  const club: Club = clubResult.data[0];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen pb-10">
      <h1 className="font-black text-xl self-start ml-10 pb-3">{`${club.title}님의 모임`}</h1>
      <section className="w-full my-4 flex items-center pl-11 pb-4">
        <h4 className="underline underline-offset-4 decoration-gray-300 mr-1">{post.nickname}</h4>
        <span className="mr-2 font-bold">님의</span>
        <div className="w-1/5  bg-customGreen border rounded-md text-white shadow-md text-center">{post.category}</div>
      </section>
      <section
        style={{ backgroundColor: post.bg_image ?? "transparent", backgroundImage: 'url("/logo.png")' }}
        className="w-4/5 p-2 border border-gray-300 rounded-md min-h-[35rem] resize-none shadow-xl bg-no-repeat bg-[length:4rem_4rem] bg-right-bottom"
      >
        <h1 className="text-2xl  mb-4">{post.content}</h1>
      </section>
      <ul className="pt-10">
        <Link
          href={`/clubs/${id}/comments`}
          className="bg-customGreen border rounded-md text-white shadow-md text-center p-2 px-10"
        >
          모임 응원글 보러가기
        </Link>
      </ul>
    </main>
  );
};

export default PostDetailPage;
