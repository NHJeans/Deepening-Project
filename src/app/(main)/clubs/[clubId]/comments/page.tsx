"use client";

import HeaderSection from "@/components/Header/HeaderSection";
import { useModal } from "@/context/modal.context";
import shareIcon from "@/public/icons/share.png";
import { Comment } from "@/types/comment.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ClubDetailPageHeader from "./_components/ClubDetailPageHeader";
import CommentGridItem from "./_components/CommentGridItem";
import CommentListItem from "./_components/CommentListItem";
import NotFound from "./_components/NotFound";
import KakaoShareButton from "./_components/Share/KakaoShare";
import DetailShareBtn from "./_components/Share/Share";

const ClubDetailPage = ({ params: { clubId } }: { params: { clubId: string } }) => {
  const modal = useModal();
  const router = useRouter();
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [positions, setPositions] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [dragState, setDragState] = useState<{ id: number; isDragging: boolean } | null>(null);
  const [initialMousePosition, setInitialMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [initialStickerPosition, setInitialStickerPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<string>("grid");
  const [isRelocating, setIsRelocating] = useState(false);
  // 종섭님 코드 -> 전역 관리로 변경 예정
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleMoveDetail = (postId: number) => {
    if (isRelocating) {
      return;
    }
    // alert -> 추후 디테일로 변경 예정
    router.push(`/guests/${clubId}/postDetail/${postId}`);
  };

  // 재배치 상태 토글 함수
  const handleRelocationToggle = useCallback(() => {
    setIsRelocating((prev) => !prev);
  }, []);

  const handleClickShareButton = () => {
    modal.open({
      title: "공유하기",
      content: (
        <div className="flex gap-4 items-center">
          <DetailShareBtn />
          <KakaoShareButton id={clubId} />
        </div>
      ),
    });
  };

  // const handleModalOpen = () => {
  //   setIsModalOpen(true);
  // };

  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  // };

  // if (!commentList || commentList.length === 0) {
  //   return <NotFound />;
  // }

  return (
    <section className="relative h-full w-full" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <HeaderSection>
        <ClubDetailPageHeader id={clubId} setViewMode={setViewMode}></ClubDetailPageHeader>
      </HeaderSection>
      {commentList && commentList.length !== 0 ? (
        <>
          <section className="relative h-[73%] overflow-y-auto">
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
              onClick={handleClickShareButton}
            >
              <Image src={shareIcon} alt="공유하기" />
            </button>
          </div>
        </>
      ) : (
        <NotFound />
      )}
      {/* <div className="flex h-[10%] items-center justify-center">
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
      </div> */}
    </section>
  );
};

export default ClubDetailPage;
