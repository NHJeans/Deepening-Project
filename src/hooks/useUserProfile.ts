import { useEffect } from "react";
import { useUserStore } from "@/store/zustand/useUserstore";
import { fetchUserProfile } from "@/apis/fetchUserProfile";

export const useUserProfile = () => {
  const { setUser, clearUser } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserProfile();

        if (data.error) {
          clearUser();
          console.error("사용자 정보를 가져오는 데 실패했습니다:", data.error);
        } else {
          setUser({
            id: data.id,
            email: data.email,
            nickname: data.nickname,
            profile_img: data.profile_img,
          });
        }
      } catch (error) {
        clearUser();
        console.error("네트워크 오류가 발생했습니다:", error);
      }
    };

    fetchData();
  }, [setUser, clearUser]);
};
