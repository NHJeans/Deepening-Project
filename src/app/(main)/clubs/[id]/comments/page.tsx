import HeaderSection from "@/components/Header/HeaderSection";
import KakaoShareButton from "@/components/share/kakao/Kakaoshare";
import DetailShareBtn from "@/components/share/share";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = createClient();
  const { data, error } = await supabase.from("Clubs").select("*").eq("id", params.id).single();

  if (!data || error) {
    notFound();
  }

  return (
    <>
      <HeaderSection>
        <div className="flex gap-x-2  ">
          <div className="relative w-[50px] h-[50px] items-center">
            {data.thumbnail && (
              <Image src={data.thumbnail} alt="이미지 없음" layout="fill" className="rounded-lg bg-cover" />
            )}
          </div>
          <div className=" ml-4 flex items-center font-bold  text-2xl"> {data.title} 모임</div>
        </div>
      </HeaderSection>
      <div className="flex gap-x-2 items-center">
        <DetailShareBtn />
        <KakaoShareButton id={params.id} />
      </div>
    </>
  );
}
