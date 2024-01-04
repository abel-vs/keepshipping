import { fetchMyUserDetails, getLastShips } from "@/lib/supabase/server";
import { EditProfileDialog } from "./edit-profile";
import { Ship, UserDetails } from "@/lib/types";
import { CreateProfileCard } from "./create-profile";
import { ProfileCard } from "./profile-card";

export const revalidate = 0;

export default async function ProfilePage() {
  const userDetails: UserDetails | null = await fetchMyUserDetails();
  const lastShips: Ship[] = await getLastShips(5);

  return (
    <div className="flex-1 w-full flex flex-col gap-4 items-center justify-center px-2">
      {userDetails ? (
        <>
          <ProfileCard userDetails={userDetails} lastShips={lastShips} />
          <EditProfileDialog username={userDetails?.username || ""} bio={""} />
        </>
      ) : (
        <CreateProfileCard />
      )}
    </div>
  );
}
