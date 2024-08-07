"use client";

import { useUserStore } from "@/store";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface SocialRedirectPageProps {
  provider: "kakao" | "google";
}

const SocialRedirectPage = ({ provider }: SocialRedirectPageProps) => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const handleSocialLogin = async () => {
      setLoading(true);
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("세션 가져오기 실패:", error.message);
          router.push("/auth/login");
          return;
        }

        const user = session?.user;
        if (!user) {
          router.push("/auth/login");
          return;
        }

        const { data: userData, error: selectError } = await supabase
          .from("Users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (selectError && selectError.code !== "PGRST116") {
          console.error("유저 데이터 선택 실패:", selectError.message);
          return;
        }

        if (userData) {
          setUser({
            id: user.id,
            email: user.email ?? "",
            nickname: userData.nickname,
            profile_img: userData.profile_img,
          });
          router.push("/clubs");
          return;
        }

        router.push("/auth/socialNickname");
      } catch (error) {
        console.error("오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    handleSocialLogin();
  }, [router, setUser, supabase]);

  if (loading) {
    return <div className="font-semibold">로그인 중...</div>;
  }

  return null;
};

export default SocialRedirectPage;
