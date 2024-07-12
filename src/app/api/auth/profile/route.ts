import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ profile_img: null, nickname: "Guest" }, { status: 200 });
  }
  const { data, error } = await supabase.from("Users").select("profile_img, nickname").eq("id", user.id).single();

  if (error) {
    return NextResponse.json({ error: "사용자 정보를 가져오는 데 실패했습니다." }, { status: 500 });
  }
  return NextResponse.json(data, { status: 200 });
}
