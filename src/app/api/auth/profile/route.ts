import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ profile_img: null, nickname: "Guest" }, { status: 200 });
  }
  const { data, error } = await supabase
    .from("Users")
    .select("id, email, profile_img, nickname")
    .eq("id", user.id)
    .single();

  if (error) {
    return NextResponse.json({ error: "사용자 정보를 가져오는 데 실패했습니다." }, { status: 500 });
  }
  return NextResponse.json(data, { status: 200 });
}

export async function PATCH(request: Request) {
  const supabase = createClient();
  const { nickname } = await request.json();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "사용자가 로그인되어 있지 않습니다." }, { status: 401 });
  }
  const { error } = await supabase.from("Users").update({ nickname }).eq("id", user.id);

  if (error) {
    return NextResponse.json({ error: "닉네임 업데이트에 실패했습니다." }, { status: 500 });
  }

  return NextResponse.json({ message: "닉네임이 성공적으로 업데이트되었습니다." }, { status: 200 });
}
