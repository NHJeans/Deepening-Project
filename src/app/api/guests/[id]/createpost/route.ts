import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { content, category, bg_image, club_id, nickname } = await request.json();

  const { data, error } = await supabase
    .from("Comments")
    .insert([{ content, category, bg_image, club_id, nickname }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return Response.json({ data });
}
