import { createClient } from "@/utils/supabase/server";

export const GET = async (request: Request, { params }: { params: { commentId: string } }) => {
  //club 데이터만 가져올 때
  const { commentId } = params;

  const supabase = createClient();

  if (!commentId) {
    return new Response("Missing id", { status: 400 });
  }

  const { data, error } = await supabase.from("Comments").select("*").eq("id", parseInt(commentId));

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
};
