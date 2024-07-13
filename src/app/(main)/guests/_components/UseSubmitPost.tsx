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
        title: "글을 써주세요",
        content: <h1 className="text-center ">내용은 필수입니다</h1>,
      });
      return;
    }
    if (content.length < 5) {
      modal.open({
        title: "글의 내용은",
        content: <h1 className="text-center ">다섯 글자 이상 입력하세요</h1>,
      });
      return;
    }

    if (!nickname) {
      modal.open({
        title: "닉네임은",
        content: (
          <div className="text-center">
            <h2>필수입니다.</h2>
            <p>세 글자 이상 적어주세요</p>
          </div>
        ),
      });
      return;
    }

    if (nickname.length < 3 || nickname.length > 10) {
      modal.open({
        title: "닉네임이",
        content: (
          <div className="text-center">
            <h3>현재 너무 짧거나 길어요.</h3>
            <p>세 글자 이상 열 글자 이하로 </p>
            <p>작성해주세요.</p>
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
          title: "",
          content: (
            <div>
              <h4 className="text-center ">글 작성 중</h4>
              <p>오류가 발생했습니다.</p>
            </div>
          ),
        });
      }
      const { data } = await response.json();
      modal.open({
        title: "",
        content: (
          <div>
            <h5 className="text-center ">글이 성공적으로</h5>
            <p>작성되었습니다!</p>
          </div>
        ),
      });
      router.push(`/guests/${id}/postDetail/${data.id}`);
    } catch (error) {
      console.error("Error creating post:", error);

      modal.open({
        title: "",
        content: (
          <div>
            <h4 className="text-center ">글 작성 중</h4>
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
