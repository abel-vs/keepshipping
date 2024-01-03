import { hasShippedToday, getLastShip } from "@/lib/supabase/server";
import SubmitShipSection from "./submit-section";
import { AddShipCard, ShipCard } from "@/components/ship-card";

export const revalidate = 0;

export default async function Home() {
  const hasShipped = await hasShippedToday();
  const lastShip = await getLastShip();

  return (
    <div className="flex-1 w-full flex flex-col gap-4 items-center justify-center">
      {hasShipped ? (
        <>
          <span className="text-8xl">🚢</span>
          <h1 className="text-4xl font-bold">You shipped!</h1>
          <div className="p-4 w-full flex flex-col gap-4 items-center">
            <AddShipCard />
            <ShipCard ship={lastShip} />
          </div>
        </>
      ) : (
        <SubmitShipSection />
      )}
    </div>
  );
}
