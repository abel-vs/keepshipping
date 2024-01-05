import { createClient } from "@/utils/supabase/client";
import { Ship, UserDetails } from "@/lib/types";
import { v4 as uuid } from "uuid";
import { isValidUUID } from "../utils";

const supabase = createClient();

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data;
};

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

export const editShip = async (ship: Ship) => {
  const { data, error } = await supabase
    .from("ships")
    .update(ship)
    .match({ id: ship.id });
  if (error) throw error;
  return data;
};

export const deleteShip = async (ship: Ship) => {
  const { error } = await supabase
    .from("ships")
    .delete()
    .match({ id: ship.id });
  if (error) throw error;
};

export const updateUserDetails = async (details: UserDetails) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in");

  const { data, error } = await supabase
    .from("user_details")
    .update(details)
    .match({ id: user.id });
  if (error) throw error;
  return data;
};

export const createUserDetails = async (details: UserDetails) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in");

  const { data, error } = await supabase
    .from("user_details")
    .insert({ ...details, id: user.id });
  console.log(data, error);
  if (error) throw error;
  return data;
};

export const likePost = async (ship_id: string, user_id: string) => {
  if (!isValidUUID(ship_id) || !isValidUUID(user_id)) return null;

  // Call the RPC function to like the post
  const { data, error } = await supabase.rpc("like_post", {
    ship_id_arg: ship_id,
    user_id_arg: user_id,
  });
  if (error) throw error;
  return data;
};

export const checkIfUserLiked = async (ship_id: string, user_id: string) => {
  if (!isValidUUID(ship_id) || !isValidUUID(user_id)) return false;

  const { data: likes, error } = await supabase
    .from("likes")
    .select("id")
    .eq("ship_id", ship_id)
    .eq("user_id", user_id)
    .limit(1);
  if (error) throw error;

  return likes.length > 0;
};

export const haveILiked = async (ship_id: string) => {
  const { user } = await getUser();
  if (!user) throw new Error("Not logged in");
  return checkIfUserLiked(ship_id, user.id);
};

export const countLikes = async (ship_id: string) => {
  const { data: likes, error } = await supabase
    .from("likes")
    .select("id")
    .eq("ship_id", ship_id);
  if (error) throw error;

  return likes.length;
};
