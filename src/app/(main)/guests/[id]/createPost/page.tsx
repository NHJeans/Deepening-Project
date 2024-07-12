"use client";

import { Club } from "@/types/club.type";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import CategoryButtons from "../../_components/categoryButton";
import ColorButtons from "../../_components/colorButton";
import CustomButton from "../../_components/submitButton";

const CreatePostPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const colorRef = useRef<string>("white");
  const categoryRef = useRef<string>("응원글");
  const nicknameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

  const handleColorChange = (color: string) => {
    colorRef.current = color;
    if (contentRef.current) {
      contentRef.current.style.backgroundColor = color;
    }
  };
  const handleCategoryChange = (category: string) => {
    categoryRef.current = category;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = contentRef.current?.value;
    const category = categoryRef.current;
    const nickname = nicknameRef.current?.value;

    if (!content) {
      alert("내용을 입력해주세요.");
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
        const { data } = await response.json();

        alert("글이 성공적으로 작성되었습니다!");
        router.push(`/guests/${id}/postDetail/${data.id}`);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="font-black text-xl self-start ml-10 pb-5 ">{`${clubData[0].title}님의 모임`}</h1>
      <div className="pl-9 flex items-start">
        <input
          id="nickname"
          ref={nicknameRef}
          required
          className="w-1/6 bg-customYellow border-b border-gray-300 outline-none text-black-500"
        />
        <span className="mr-1 font-bold">님의</span>
        <CategoryButtons handleCategoryChange={handleCategoryChange} />
      </div>

      <form onSubmit={handleSubmit} className="w-4/5">
        <div className="my-4">
          <textarea
            id="content"
            ref={contentRef}
            required
            className="w-full p-2 text-2xl border border-gray-300 rounded-md min-h-[30rem] resize-none shadow-xl  bg-no-repeat bg-[length:4rem_4rem] bg-right-bottom"
            style={{ backgroundColor: colorRef.current, backgroundImage: 'url("/logo.png")' }}
          />
        </div>
        <label className="block mb-2 p-5 font-bold">편지색</label>
        <div className="flex space-x-2 mb-12 justify-center pb-20">
          <ColorButtons handleColorChange={handleColorChange} />
        </div>
        <div className="flex justify-end">
          <CustomButton type="submit">작성</CustomButton>
        </div>
      </form>
    </section>
  );
};

export default CreatePostPage;
