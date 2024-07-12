import { createClient } from "@/utils/supabase/server";

export const GET = async (request: Request, { params }: { params: { id: string; postId: string } }) => {
  //club 데이터만 가져올 때
  const { id, postId } = params;

  const supabase = createClient();

  if (!postId) {
    return new Response("Missing id", { status: 400 });
  }

  const { data, error } = await supabase.from("Comments").select("*").eq("id", parseInt(postId));

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
};
