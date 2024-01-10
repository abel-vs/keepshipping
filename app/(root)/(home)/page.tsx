import { hasShippedToday, getTodayShips } from "@/lib/supabase/server";
import SubmitShipSection from "./submit-section";
import { EditableShipCard } from "@/components/ship-card";
import { FeedSection } from "./feed-section";
import ShipInput from "./ship-input";

export const revalidate = 0;

export default async function Home() {
  const hasShipped = await hasShippedToday();
  const todayShips = await getTodayShips();

  return (
    <div className="flex-1 w-full flex flex-col gap-4 px-4 items-center justify-center">
      {hasShipped ? (
        <>
          <span className="text-6xl md:text-8xl">🚢</span>
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">
            You shipped!
          </h1>
          <div className="w-full max-w-3xl">
            <ShipInput text="I also shipped..." />
          </div>
          {todayShips.map((ship) => (
            <EditableShipCard key={ship.id} ship={ship} />
          ))}
          <div className="h-4" />
          <FeedSection />
        </>
      ) : (
        <SubmitShipSection />
      )}
    </div>
  );
}
