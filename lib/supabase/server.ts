import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { isValidUUID } from "../utils";

export const getUser = async () => {
  const supabase = createClient(cookies());
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data;
};

export const getLastShips = async (user_id: string, limit: number) => {
  if (!isValidUUID(user_id)) return [];

  const supabase = createClient(cookies());

  const { data: ships, error: shipsError } = await supabase
    .from("ships")
    .select("*")
    .eq("user_id", user_id)
    .order("date", { ascending: false })
    .limit(limit);
  if (shipsError) throw shipsError;

  return ships;
};

export const getFeedShips = async (limit: number) => {
  const supabase = createClient(cookies());

  const { data: ships, error: shipsError } = await supabase
    .from("ships")
    .select("*")
    .order("date", { ascending: false })
    .limit(limit);
  if (shipsError) throw shipsError;

  return ships;
};

export const getLastShip = async (user_id: string) => {
  const ships = await getLastShips(user_id, 1);
  if (ships.length == 0) {
    return null;
  } else {
    return ships[0];
  }
};

export const getMyLastShip = async () => {
  const { user } = await getUser();
  if (!user) throw new Error("Not logged in");
  return getLastShip(user.id);
};

export const getMyLastShips = async (limit: number) => {
  const { user } = await getUser();
  if (!user) throw new Error("Not logged in");
  return getLastShips(user.id, limit);
};

export const hasShippedToday = async () => {
  const ship = await getMyLastShip();
  if (!ship) return false;

  const today = new Date().toISOString().slice(0, 10);
  const shipDate = new Date(ship.date).toISOString().slice(0, 10);
  return shipDate == today;
};

export const fetchUserDetails = async (user_id: string) => {
  if (!isValidUUID(user_id)) return null;

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
