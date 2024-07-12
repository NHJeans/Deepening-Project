import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { data, error } = await supabase.from("Comments").select("*").order("created_at", { ascending: false });

  if (error instanceof Error) {
    return NextResponse.json({ error: error.message });
  }

  return NextResponse.json(data, { status: 200 });
}
