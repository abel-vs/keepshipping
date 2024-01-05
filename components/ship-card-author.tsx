import { fetchUserDetails, getUser } from "@/lib/supabase/server";
import { Ship } from "@/lib/types";
import { formatDateTime, timeAgoString } from "@/lib/utils";
import { LikeButton } from "./like-button";

export const ShipCardWithAuthor = async ({ ship }: { ship: Ship }) => {
  const details = await fetchUserDetails(ship.user_id);
  const { user } = await getUser();
  const isMe = user?.id === ship.user_id;
  return (
    <div className="flex items-center bg-secondary w-full max-w-3xl rounded-md px-4 py-2">
      <span className="mr-4 text-3xl">🚢</span>{" "}
      <div className="flex flex-grow  flex-col items-start justify-center">
        <span className="text-neutral-500 text-sm">
          {isMe ? (
            <span>
              <a
                className="dark:hover:text-neutral-200 hover:text-neutral-800 hover:font-medium"
                href="/profile"
              >
                You{" "}
              </a>
              shipped
            </span>
          ) : (
            <span>
              <a
                className="dark:hover:text-neutral-200 hover:text-neutral-800 hover:font-medium"
                href={`/profile/${ship.user_id}`}
              >
                {details?.username || "Someone"}
              </a>{" "}
              shipped
            </span>
          )}
        </span>
        <span className="font-medium text-left">{ship.description}</span>
      </div>
      <div className="mr-4">
        <LikeButton ship={ship} />
      </div>
      <span className="text-sm text-neutral-500">
        {formatDateTime(ship.date)}
      </span>
    </div>
  );
};
