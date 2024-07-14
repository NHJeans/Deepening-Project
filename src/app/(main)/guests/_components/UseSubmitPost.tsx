import { useModal } from "@/context/modal.context";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const useSubmitPost = (id: string, initialBgColor: string, initialCategory: string) => {
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<string>(initialBgColor);
  const categoryRef = useRef<string>(initialCategory);
  const [bgColor, setBgColor] = useState<string>(initialBgColor);
  const router = useRouter();
  const modal = useModal();

  const handleColorChange = (color: string) => {
    colorRef.current = color;
    setBgColor(color);
  };

  const handleCategoryChange = (category: string) => {
    categoryRef.current = category;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = contentRef.current?.value;
    const category = categoryRef.current;
    const nickname = nicknameRef.current?.value;
    const bgImage = colorRef.current;

    if (!content) {
      modal.open({
        title: "알림",
        content: <h1 className="text-center ">글 내용은 필수입니다</h1>,
      });
      return;
    }
    if (content.length < 5) {
      modal.open({
        title: "알림",
        content: (
          <div className="text-center ">
            <h1>글이 너무 짧습니다</h1>
            <p> 다섯 글자 이상</p>
            <p>입력해주세요.</p>
          </div>
        ),
      });
      return;
    }

    if (!nickname) {
      modal.open({
        title: "알림",
        content: (
          <div className="text-center">
            <h1>닉네임은</h1>
            <p>필수입니다.</p>
          </div>
        ),
      });
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
          bg_image: bgImage,
          club_id: id,
        }),
      });

      if (!response.ok) {
        modal.open({
          title: "오류",
          content: (
            <div className="text-center">
              <h1>글 작성 중</h1>
              <p>오류가 발생했습니다.</p>
              <p>데이터가 올바르게</p>
              <p>전송되지 않았습니다.</p>
            </div>
          ),
        });
      }
      const { data } = await response.json();
      modal.open({
        title: "알림",
        content: (
          <div className="text-center">
            <h1>글이 성공적으로</h1>
            <p>작성되었습니다!</p>
          </div>
        ),
      });
      router.push(`/guests/${id}/postDetail/${data.id}`);
    } catch (error) {
      console.error("Error creating post:", error);

      modal.open({
        title: "오류",
        content: (
          <div className="text-center">
            <h1>글 작성 중</h1>
            <p>오류가 발생했습니다.</p>
          </div>
        ),
      });
    }
  };

  return {
    handleSubmit,
    handleColorChange,
    handleCategoryChange,
    contentRef,
    nicknameRef,
    colorRef,
    categoryRef,
    bgColor,
  };
};

export default useSubmitPost;
