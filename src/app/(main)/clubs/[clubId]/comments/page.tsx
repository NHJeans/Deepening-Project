"use client";

import HeaderSection from "@/components/Header/HeaderSection";
import { useModal } from "@/context/modal.context";
import shareIcon from "@/public/icons/share.png";
import { Comment } from "@/types/comment.type";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ClubDetailPageHeader from "./_components/ClubDetailPageHeader";
import CommentGridItem from "./_components/CommentGridItem";
import CommentListItem from "./_components/CommentListItem";

const ClubDetailPage = ({ params: { clubId } }: { params: { clubId: string } }) => {
  const modal = useModal();
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [positions, setPositions] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [dragState, setDragState] = useState<{ id: number; isDragging: boolean } | null>(null);
  const [initialMousePosition, setInitialMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [initialStickerPosition, setInitialStickerPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<string>("grid");
  const [isRelocating, setIsRelocating] = useState(false);

  useEffect(() => {
    const fetchCommentData = async () => {
      const response = await fetch(`/api/clubs/${clubId}/comments`);
      const data: Comment[] = await response.json();
      setCommentList(data);

      const initialPositions = data.reduce(
        (acc, comment, index) => {
          const row = Math.floor(index / 2);
          const col = index % 2;
          acc[comment.id] = { x: col * 170 + 40, y: row * 180 + 20 };
          return acc;
        },
        {} as { [key: string]: { x: number; y: number } },
      );

      setPositions(initialPositions);
    };

    fetchCommentData();
  }, [clubId]);

  // 드래그 시작시 호출
  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    setDragState({ id, isDragging: false });
    if (!isRelocating) return;

    setInitialMousePosition({ x: e.clientX, y: e.clientY });
    setInitialStickerPosition({ x: positions[id].x, y: positions[id].y });
  };

  // 드래그 끝날 때 호출
  const handleMouseUp = () => {
    // 재배치 모드에서 드래그 작업이 진행된 경우
    if (isRelocating) {
      if (dragState && dragState.isDragging) {
        setDragState(null);
        return;
      }
      setDragState(null);
      return;
    }

    // 드래그 작업은 진행되지 않으나, 클릭된 경우 => onClick 효과
    if (dragState) {
      handleMoveDetail(dragState.id);
    }
    setDragState(null);
  };

  // 마우스 이동시 호출
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState || !isRelocating) return;

    const deltaX = e.clientX - initialMousePosition.x;
    const deltaY = e.clientY - initialMousePosition.y;

    // 일정 값 이상 이동하면 드래그를 한 것으로 간주
    if (!dragState.isDragging && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
      setDragState((prevDragState) => (prevDragState ? { ...prevDragState, isDragging: true } : null));
    }

    if (dragState.isDragging) {
      setPositions((prevPositions) => ({
        ...prevPositions,
        [dragState.id]: {
          x: initialStickerPosition.x + deltaX,
          y: initialStickerPosition.y + deltaY,
        },
      }));
    }
  };

  const handleMoveDetail = (id: number) => {
    if (isRelocating) {
      return;
    }
    // alert -> 추후 디테일로 변경 예정
    alert(`클릭: ${id}`);
  };

  // 재배치 상태 토글 함수
  const handleRelocationToggle = useCallback(() => {
    setIsRelocating((prev) => !prev);
  }, []);

  const handleClickButton = () => {
    modal.open({ title: "안녕하세요", content: <div>hi</div>, path: "/login" });
  };

  return (
    <section className="relative h-full w-full" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <HeaderSection>
        <ClubDetailPageHeader id={clubId} setViewMode={setViewMode} />
      </HeaderSection>
      <section className="relative h-[75%] overflow-y-auto">
        {viewMode === "grid"
          ? commentList.map((comment) => (
              <CommentGridItem
                key={comment.id}
                comment={comment}
                position={positions[comment.id]}
                handleMouseDown={handleMouseDown}
              />
            ))
          : commentList.map((comment) => (
              <CommentListItem
                key={comment.id}
                comment={comment}
                handleMoveDetail={() => handleMoveDetail(comment.id)}
              />
            ))}
      </section>
      <div className="flex h-[9%] items-center justify-center gap-2">
        <button
          className="cursor-pointer rounded bg-customGreen px-16 py-2 font-semibold text-white hover:opacity-90"
          onClick={handleRelocationToggle}
        >
          {isRelocating ? "배치 완료" : "재배치(pc 전용)"}
        </button>
        <button
          className="cursor-pointer rounded bg-customGreen p-2 font-semibold text-white hover:opacity-90"
          onClick={handleClickButton}
        >
          <Image src={shareIcon} alt="공유하기" />
        </button>
      </div>
    </section>
  );
};

export default ClubDetailPage;
