import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { data, error } = await supabase.from("Comments").select("*");

  if (error instanceof Error) {
    return NextResponse.json({ error: error.message });
  }

  return NextResponse.json(data, { status: 200 });
}

// import { createClient } from "@/utils/supabase/server";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   const supabase = createClient();

//   const { data: commentData, error: commentError } = await supabase.from("Comments").select("*");
//   const { data: clubTitle, error: clubError } = await supabase.from("Clubs").select("*").eq("id", clubId).single();
//   if (commentError instanceof Error) {
//     return NextResponse.json({ error: commentError.message });
//   }

//   const data = { comments: commentData, clubs: clubTitle };
//   return NextResponse.json(data, { status: 200 });
// }
