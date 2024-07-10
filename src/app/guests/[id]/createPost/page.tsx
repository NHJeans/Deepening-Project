"use client";

import { Club } from "@/types/club.type";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRef } from "react";
import CategoryButtons from "../../_components/categoryButtons";
import ColorButtons from "../../_components/colorButtons";

const CreatePostPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const colorRef = useRef<string>("white");
  const categoryRef = useRef<string>("응원글");
  const nicknameRef = useRef<HTMLInputElement>(null);

  const {
    data: clubData,
    isPending,
    error,
  } = useQuery<Club[], Error, Club[], [string, string]>({
    queryKey: ["clubs", id],
    queryFn: async () => {
      const response = await fetch(`/api/guests/${id}`);
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
    return <div>무언가 잘못되었습니다{error.message}</div>;
  }

  const club = clubData ? clubData[0] : null;

  const handleColorChange = (color: string) => {
    colorRef.current = color;
    if (contentRef.current) {
      contentRef.current.style.backgroundColor = color;
    }
  };
  const handleCategoryChange = (category: string) => {
    categoryRef.current = category;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const content = contentRef.current?.value;
    const category = categoryRef.current;
    const nickname = nicknameRef.current?.value;

    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }

    const club_id = parseInt(id, 10); // params = club

    if (isNaN(club_id)) {
      alert("유효한 클럽 ID가 아닙니다.");
      return;
    }

    try {
      const response = await fetch(`/api/guests/${id}/createpost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname,
          content,
          category,
          bg_image: colorRef.current,
          club_id: id,
        }),
      });

      if (response.ok) {
        alert("글이 성공적으로 작성되었습니다!");
        // if (contentRef.current) contentRef.current.value = "";
        // return NextResponse.redirect(new URL('/api/guests/${id}/', request.url));
      } else {
        alert("글 작성 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="font-extrabold self-start">{club ? `${club.title}님의 모임` : "모임"}</h1>
      <div className="my-4 flex items-start ">
        <input
          id="nickname"
          ref={nicknameRef}
          required
          className="w-1/5 bg-customYellow border-b border-gray-300 outline-none placeholder-gray-500 mr-2"
        />
        <span className="mr-4">님의</span>
        <CategoryButtons handleCategoryChange={handleCategoryChange} />
      </div>

      <form onSubmit={handleSubmit} className="w-4/5 ">
        <div className=" my-4">
          <textarea
            id="content"
            ref={contentRef}
            required
            className="w-full p-2 border border-gray-300 rounded-md min-h-120 resize-none shadow-xl  bg-no-repeat bg-[length:4rem_4rem] bg-right-bottom"
            style={{ backgroundColor: colorRef.current, backgroundImage: 'url("/logo.png")' }}
          />
        </div>
        <label className="block mb-2 p-5">편지색</label>
        <div className="flex space-x-2 mb-12 justify-center pb-20">
          <ColorButtons handleColorChange={handleColorChange} />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-1 bg-customGreen text-white rounded-md shadow-md ">
            작성
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
