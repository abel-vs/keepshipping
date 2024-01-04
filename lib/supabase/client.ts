import { createClient } from "@/utils/supabase/client";
import { Ship, UserDetails } from "@/lib/types";
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
