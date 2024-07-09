"use client";

import HeaderSection from "@/components/Header/HeaderSection";
import { Comment } from "@/types/comment.type";
import { selectPlantImg } from "@/utils/selectPlantImg";
import Image from "next/image";
import { useEffect, useState } from "react";
import gridImg from "../../../../../public/icons/grid-filled.png";
import listImg from "../../../../../public/icons/list-lined.png";

const ClubDetailPage = ({ params }: { params: { id: string } }) => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [positions, setPositions] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [dragging, setDragging] = useState<{ id: string; isDragging: boolean } | null>(null);
  const [initialMousePosition, setInitialMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [initialStickerPosition, setInitialStickerPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const fetchCommentData = async () => {
      const response = await fetch("http://localhost:3000/api/clubs");
      const data: Comment[] = await response.json();
      setCommentList(data);

      const initialPositions = data.reduce(
        (acc, comment, index) => {
          const row = Math.floor(index / 2);
          const col = index % 2;
          acc[comment.id] = { x: col * 170 + 50, y: row * 200 + 20 };
          return acc;
        },
        {} as { [key: string]: { x: number; y: number } },
      );

      setPositions(initialPositions);
    };

    fetchCommentData();
  }, []);

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    setDragging({ id, isDragging: false });
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
    setInitialStickerPosition({ x: positions[id].x, y: positions[id].y });
  };

  const handleMouseUp = () => {
    if (dragging && dragging.isDragging) {
      setDragging(null);
      return;
    }
    if (dragging) {
      handleMoveDetail(dragging.id);
    }
    setDragging(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    const deltaX = e.clientX - initialMousePosition.x;
    const deltaY = e.clientY - initialMousePosition.y;

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

  const handleMoveDetail = (id: string) => {
    alert(`클릭: ${id}`);
  };

  return (
    <section className="relative h-full w-full" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <HeaderSection>
        <h1>clubDetailPage2</h1>
        <div className="flex gap-1">
          <div className="w-6 h-6 rounded bg-customGreen cursor-pointer hover:brightness-90 active:opacity-85">
            <Image src={gridImg} alt="grid" />
          </div>
          <button
            className="w-6 h-6 rounded bg-customGreen cursor-pointer hover:brightness-95 active:opacity-85"
            type="button"
          >
            <Image src={listImg} alt="list" />
          </button>
        </div>
      </HeaderSection>
      <div className="relative h-[74%] p-2 overflow-y-auto">
        {commentList.map((comment) => (
          <div
            key={comment.id}
            className="absolute flex flex-col items-center justify-center rounded-lg cursor-pointer"
            onMouseDown={(e) => handleMouseDown(e, comment.id.toString())}
            style={{
              left: `${positions[comment.id]?.x}px`,
              top: `${positions[comment.id]?.y}px`,
              width: "130px",
              height: "170px",
            }}
          >
            <Image src={selectPlantImg(comment.category)} alt={comment.category} width={100} height={100} priority />
            <h3 className="absolute bottom-0 text-sm text-center w-full">{`${comment.nickname}님의 ${comment.category}`}</h3>
          </div>
        ))}
      </div>
      <div className="flex h-[10%] items-center justify-center">
        <button className="cursor-pointer rounded bg-customGreen px-24 py-2 font-semibold text-white hover:opacity-90">
          공유하기
        </button>
      </div>
    </section>
  );
};

export default ClubDetailPage;
