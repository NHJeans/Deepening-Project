"use client";

import HeaderSection from "@/components/Header/HeaderSection";
import { Comment } from "@/types/comment.type";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import menuDotIcon from "../../../../../../public/icons/share.png";
import ClubDetailPageHeader from "./_components/ClubDetailPageHeader";
import CommentGridItem from "./_components/CommentGridItem";
import CommentListItem from "./_components/CommentListItem";

const ClubDetailPage = ({ params: { clubId } }: { params: { clubId: string } }) => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [positions, setPositions] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [dragging, setDragging] = useState<{ id: string; isDragging: boolean } | null>(null);
  const [initialMousePosition, setInitialMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [initialStickerPosition, setInitialStickerPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<string>("grid");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRearranging, setIsRearranging] = useState(false);

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

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, id: string) => {
      if (!isRearranging) return;
      setDragging({ id, isDragging: false });
      setInitialMousePosition({ x: e.clientX, y: e.clientY });
      setInitialStickerPosition({ x: positions[id].x, y: positions[id].y });
    },
    [isRearranging, positions],
  );

  const handleMouseUp = useCallback(() => {
    if (!isRearranging) return;

    if (dragging && dragging.isDragging) {
      setDragging(null);
      return;
    }

    if (dragging) {
      handleMoveDetail(dragging.id);
    }

    setDragging(null);
  }, [isRearranging, dragging]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging || !isRearranging) return;

      const deltaX = e.clientX - initialMousePosition.x;
      const deltaY = e.clientY - initialMousePosition.y;

      if (!dragging.isDragging && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
        setDragging((prevDragging) => (prevDragging ? { ...prevDragging, isDragging: true } : null));
      }

      if (dragging.isDragging) {
        setPositions((prevPositions) => ({
          ...prevPositions,
          [dragging.id]: {
            x: initialStickerPosition.x + deltaX,
            y: initialStickerPosition.y + deltaY,
          },
        }));
      }
    },
    [dragging, isRearranging, initialMousePosition, initialStickerPosition],
  );

  const handleMoveDetail = useCallback(
    (clubId: string) => {
      if (isRearranging) return;
      alert(`클릭: ${clubId}`);
    },
    [isRearranging],
  );

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleRearrangeToggle = useCallback(() => {
    setIsRearranging((prev) => !prev);
    setIsMenuOpen(false);
  }, []);

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
              <CommentListItem key={comment.id} comment={comment} handleMoveDetail={handleMoveDetail} />
            ))}
      </section>
      <div className="flex h-[9%] items-center justify-center gap-2">
        <button className="cursor-pointer rounded bg-customGreen px-24 py-2 font-semibold text-white hover:opacity-90">
          공유하기
        </button>
        <button
          className="cursor-pointer rounded bg-customGreen p-1 font-semibold text-white hover:opacity-90"
          onClick={handleMenuToggle}
        >
          <div className="p-1">
            <Image src={menuDotIcon} alt="..." />
          </div>
        </button>
        {isMenuOpen && (
          <div className="absolute bottom-14 mb-2 right-4 bg-white border border-customGreen rounded shadow-md p-2 z-10">
            <ul>
              <li className="p-2 text-sm cursor-pointer hover:bg-gray-100" onClick={handleRearrangeToggle}>
                {isRearranging ? "배치 완료" : "재배치"}
              </li>
              <li className="p-2 text-sm cursor-pointer hover:bg-gray-100" onClick={handleMenuToggle}>
                버튼
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClubDetailPage;
