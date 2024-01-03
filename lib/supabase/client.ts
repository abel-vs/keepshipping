import { createClient } from "@/utils/supabase/client";
import { Ship } from "@/lib/types";
import { v4 as uuid } from "uuid";

const supabase = createClient();

export const addShip = async (description: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in");

  const id = uuid();

  const ship: Ship = {
    id,
    description,
    date: new Date(),
    user_id: user.id,
  };
  const { data, error } = await supabase.from("ships").insert(ship);
  if (error) throw error;
  return data;
};