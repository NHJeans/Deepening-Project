"use client";

import HeaderSection from "@/components/Header/HeaderSection";
import { Comment } from "@/types/comment.type";
import { useEffect, useState } from "react";
import ClubDetailPageHeader from "./_components/ClubDetailPageHeader";
import CommentGridItem from "./_components/CommentGridItem";
import CommentListItem from "./_components/CommentListItem";
import ShareModal from "./_components/Modal/ShareModal";
import DetailShareBtn from "./_components/Share/Share";
import KakaoShareButton from "./_components/Share/KakaoShare";

const ClubDetailPage = ({ params: { clubId } }: { params: { clubId: string } }) => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [positions, setPositions] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [dragging, setDragging] = useState<{ id: string; isDragging: boolean } | null>(null);
  const [initialMousePosition, setInitialMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [initialStickerPosition, setInitialStickerPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<string>("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCommentData = async () => {
      const response = await fetch(`http://localhost:3000/api/clubs/${clubId}/comments`);
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
  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    setDragging({ id, isDragging: false });
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
    setInitialStickerPosition({ x: positions[id].x, y: positions[id].y });
  };

  // 드래그 끝날 때 호출
  const handleMouseUp = () => {
    // 실제 드래그 작업이 진행된 경우
    if (dragging && dragging.isDragging) {
      setDragging(null);
      return;
    }

    // 드래그 작업은 진행되지 않으나, 클릭된 경우 => onClick 효과
    if (dragging) {
      handleMoveDetail(dragging.id);
    }

    setDragging(null);
  };

  // 마우스 이동시 호출
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    const deltaX = e.clientX - initialMousePosition.x;
    const deltaY = e.clientY - initialMousePosition.y;

    // 일정 값 이상 이동하면 드래그를 한 것으로 간주
    if (!dragging.isDragging && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
      setDragging({ ...dragging, isDragging: true });
    }

    if (dragging.isDragging) {
      const newPositions = { ...positions };
      newPositions[dragging.id] = {
        x: initialStickerPosition.x + deltaX,
        y: initialStickerPosition.y + deltaY,
      };
      setPositions(newPositions);
    }
  };

  const handleMoveDetail = (clubId: string) => {
    // alert -> 추후 디테일로 변경 예정
    alert(`클릭: ${clubId}`);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="relative h-full w-full " onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <HeaderSection>
        <ClubDetailPageHeader id={clubId} setViewMode={setViewMode}></ClubDetailPageHeader>
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
              <CommentListItem key={comment.id} comment={comment} handleMoveDetail={handleMoveDetail} />
            ))}
      </section>
      <div className="flex h-[10%] items-center justify-center">
        <button
          className="cursor-pointer rounded bg-customGreen px-24 py-2 font-semibold text-white hover:opacity-90"
          onClick={handleModalOpen}
        >
          공유하기
        </button>
        <ShareModal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="flex flex-wrap gap-x-10 gap-y-5 justify-center items-center mb-2.5">
            <DetailShareBtn />
            <KakaoShareButton id={clubId} />
          </div>
        </ShareModal>
      </div>
    </section>
  );
};

export default ClubDetailPage;
