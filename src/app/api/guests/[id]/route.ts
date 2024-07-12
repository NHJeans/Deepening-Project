import { createClient } from "@/utils/supabase/server";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  //club 데이터만 가져올 때
  const { id } = params;

  const supabase = createClient();

  if (!id) {
    return new Response("Missing id", { status: 400 });
  }

  const { data, error } = await supabase.from("Clubs").select("*").eq("id", parseInt(id));

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
};
