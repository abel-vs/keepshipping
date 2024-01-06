import { ShipCard } from "@/components/ship-card";
import { ShipCardWithAuthor } from "@/components/ship-card-author";
import { getFeedShips } from "@/lib/supabase/server";

export const FeedSection = async () => {
  const latestShips = await getFeedShips(5);
  return (
    <>
      <h1 className="text-xl md:text-4xl font-bold text-center">
        latest ships from other people
      </h1>
      <div className="flex flex-col  w-full items-center gap-4">
        {latestShips.map((ship) => (
          <ShipCardWithAuthor key={ship.id} ship={ship} />
        ))}
      </div>
    </>
  );
};
