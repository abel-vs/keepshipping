import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const supabase = createClient(cookies());

export const hasShippedToday = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in");

  const { data: ships, error: shipsError } = await supabase
    .from("ships")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .limit(1);
  if (shipsError) throw shipsError;

  if (ships.length == 0) {
    return false;
  } else {
    const today = new Date().toISOString().slice(0, 10);
    const shipDate = new Date(ships[0].date).toISOString().slice(0, 10);
    return shipDate == today;
  }
};
