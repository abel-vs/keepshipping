import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const getLastShips = async (limit: number) => {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in");

  const { data: ships, error: shipsError } = await supabase
    .from("ships")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .limit(limit);
  if (shipsError) throw shipsError;

  return ships;
};

export const getLastShip = async () => {
  const ships = await getLastShips(1);
  if (ships.length == 0) {
    return null;
  } else {
    return ships[0];
  }
};

export const hasShippedToday = async () => {
  const ship = await getLastShip();
  if (!ship) return false;

  const today = new Date().toISOString().slice(0, 10);
  const shipDate = new Date(ship.date).toISOString().slice(0, 10);
  return shipDate == today;
};

export const fetchUserDetails = async (user_id: string) => {
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("user_details")
    .select("*")
    .eq("id", user_id)
    .limit(1);
  if (error) throw error;
  return data ? data[0] : null;
};

export const fetchMyUserDetails = async () => {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in");

  return fetchUserDetails(user.id);
};
