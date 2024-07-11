import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { email } = await request.json();

  const { data, error } = await supabase.from("Users").select("id").eq("email", email).single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (data) {
    return NextResponse.json({ exists: true });
  }

  return NextResponse.json({ exists: false });
}
