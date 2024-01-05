import { fetchUserDetails, getUser } from "@/lib/supabase/server";
import { Ship } from "@/lib/types";
import { formatDateTime, timeAgoString } from "@/lib/utils";

export const ShipCardWithAuthor = async ({ ship }: { ship: Ship }) => {
  const details = await fetchUserDetails(ship.user_id);
  const { user } = await getUser();
  const isMe = user?.id === ship.user_id;
  return (
    <div className="flex items-center bg-secondary w-full max-w-3xl rounded-md px-4 py-2">
      <span className="mr-4 text-3xl">🚢</span>{" "}
      <div className="flex flex-grow  flex-col items-start justify-center">
        <span className="text-neutral-500 text-sm">
          {(isMe ? "You" : details?.username || "Someone") + " shipped"}
        </span>
        <span className="font-medium text-left">{ship.description}</span>
      </div>
      <span className="text-sm text-neutral-500">
        {formatDateTime(ship.date)}
      </span>
    </div>
  );
};
