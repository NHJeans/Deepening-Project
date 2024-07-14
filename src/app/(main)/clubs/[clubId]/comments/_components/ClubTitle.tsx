"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import ClubDetailHeaderSkeleton from "./ClubDetailHeaderSkeleton";

interface ClubTitleProps {
  clubId: string;
}
interface ClubData {
  thumbnail: string | null | undefined;
  title: string | null | undefined;
}

const ClubTitle = ({ clubId }: ClubTitleProps) => {
  const [clubData, setClubData] = useState<ClubData>();
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const { data, error } = await supabase.from("Clubs").select("*").eq("id", clubId).single();
        const clubsData = { thumbnail: data?.thumbnail, title: data?.title };
        setClubData(clubsData);
      } catch (error) {
        setError("모임 데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.");
      }
    };

    fetchClubData();
  }, [clubId]);
  if (error) {
    return <div>{error}</div>;
  }

  if (!clubData) {
    return <ClubDetailHeaderSkeleton />;
  }
  return (
    <div className="flex">
      <div className="relative w-[60px] h-[60px] items-center">
        {clubData.thumbnail && (
          <Image src={clubData.thumbnail} alt="Thumbnail" layout="fill" className="rounded-full bg-cover" />
        )}
      </div>
      <div className="ml-4 flex items-center font-bold text-2xl">{clubData.title} 모임</div>
    </div>
  );
};

export default ClubTitle;
