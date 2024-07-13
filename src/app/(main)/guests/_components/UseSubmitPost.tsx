import { useRouter } from "next/navigation";
import { useRef } from "react";

const useSubmitPost = (id: string, initialBgColor: string, initialCategory: string) => {
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const bgImageRef = useRef<string>(initialBgColor);
  const categoryRef = useRef<string>(initialCategory);
  const router = useRouter();

  const handleColorChange = (color: string) => {
    bgImageRef.current = color;
  };

  const handleCategoryChange = (category: string) => {
    categoryRef.current = category;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = contentRef.current?.value;
    const category = categoryRef.current;
    const nickname = nicknameRef.current?.value;
    const bgImage = bgImageRef.current;

    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }

    if (!nickname) {
      alert("닉네임을 설정해주세요");
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
        alert("글 작성 중 오류가 발생했습니다.");
        return;
      }
      const { data } = await response.json();

      alert("글이 성공적으로 작성되었습니다!");
      router.push(`/guests/${id}/postDetail/${data.id}`);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("글 작성 중 오류가 발생했습니다.");
    }
  };

  return {
    handleSubmit,
    handleColorChange,
    handleCategoryChange,
    contentRef,
    nicknameRef,
    bgImageRef,
    categoryRef,
  };
};

export default useSubmitPost;
