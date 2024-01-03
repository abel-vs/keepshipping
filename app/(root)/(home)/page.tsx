import { hasShippedToday } from "@/lib/supabase/server";
import SubmitShipSection from "./submit-section";

export const revalidate = 0;

export default async function Home() {
  const hasShipped = await hasShippedToday();

  return (
    <div className="flex-1 w-full flex flex-col gap-4 items-center justify-center">
      <span className="text-8xl">🚢</span>

      {hasShipped ? (
        <h1 className="text-4xl font-bold">You shipped!</h1>
      ) : (
        <SubmitShipSection />
      )}
    </div>
  );
}
