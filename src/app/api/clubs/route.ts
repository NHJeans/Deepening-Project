import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createClient();

  const { data, error } = await supabase.from("Clubs").select("*");

  if (error instanceof Error) {
    return NextResponse.json({ error: error.message });
  }
  return NextResponse.json(data, { status: 200 });
}
