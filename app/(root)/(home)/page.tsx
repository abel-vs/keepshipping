import { hasShippedToday, getMyLastShip } from "@/lib/supabase/server";
import SubmitShipSection from "./submit-section";
import { EditableShipCard, ShipCard } from "@/components/ship-card";
import { FeedSection } from "./feed-section";
import { ShipCardWithAuthor } from "@/components/ship-card-author";
import { SearchBar } from "@/components/searchbar";

export const revalidate = 0;

export default async function Home() {
  const hasShipped = await hasShippedToday();
  const lastShip = await getMyLastShip();

  return (
    <div className="flex-1 w-full flex flex-col gap-4 px-4 items-center justify-center">
      {hasShipped ? (
        <>
          <span className="text-6xl md:text-8xl">🚢</span>
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">
            You shipped!
          </h1>

          <EditableShipCard ship={lastShip} />
          <div className="h-4" />
          <FeedSection />
        </>
      ) : (
        <SubmitShipSection />
      )}
    </div>
  );
}
