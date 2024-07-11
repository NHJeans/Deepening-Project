"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

const KakaoRedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleKakaoLogin = async () => {
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

      if (!userData) {
        const { full_name = "Unknown", avatar_url = "" } = user.user_metadata || {};

        const { error: insertError } = await supabase.from("Users").insert({
          id: user.id,
          email: user.email!,
          nickname: full_name,
          profile_img: avatar_url,
        });

        if (insertError) {
          console.error("유저 데이터 삽입 실패:", insertError.message);
          return;
        }
      }

      router.push("/clubs");
    };

    handleKakaoLogin();
  }, [router]);

  return <div>로그인 중...</div>;
};

export default KakaoRedirectPage;
