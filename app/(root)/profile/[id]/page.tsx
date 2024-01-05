import {
  fetchMyUserDetails,
  fetchUserDetails,
  getLastShips,
  getMyLastShips,
} from "@/lib/supabase/server";
import { Ship, UserDetails } from "@/lib/types";
import { ProfileCard } from "../profile-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const revalidate = 0;

export default async function ProfilePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const userDetails: UserDetails | null = await fetchUserDetails(id);
  const lastShips: Ship[] = await getLastShips(id, 5);

  return (
    <div className="flex flex-grow w-full flex-col items-center justify-center">
      {userDetails ? (
        <ProfileCard userDetails={userDetails} lastShips={lastShips} />
      ) : (
        <>
          <h1 className="text-3xl font-bold  md:text-5xl">User Not Found</h1>
          <p className="p-4 text-xl">
            {"Couldn't find the profile of the user."}
          </p>
          <Button asChild className="mt-8">
            <Link href="/">Return Home</Link>
          </Button>
        </>
      )}
    </div>
  );
}
