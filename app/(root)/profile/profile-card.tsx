import { EditableShipCard, ShipCard } from "@/components/ship-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { calculateStreak } from "@/lib/supabase/server";
import { Ship, UserDetails } from "@/lib/types";
import { GithubIcon, TwitterIcon, LinkIcon } from "lucide-react";
import Link from "next/link";

export const ProfileCard = async ({
  userDetails,
  lastShips,
}: {
  userDetails: UserDetails;
  lastShips: Ship[];
}) => {
  const current_streak = await calculateStreak();
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <div className="flex justify-between w-full items-start">
          <div>
            <CardTitle>{userDetails.username}</CardTitle>
            <CardDescription className="mt-1">
              {userDetails.bio}
            </CardDescription>
          </div>
          <div className="flex items-center">
            {userDetails.github_url && (
              <Button variant="ghost" size="icon" asChild>
                <Link href={userDetails.github_url}>
                  <GithubIcon className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {userDetails.twitter_url && (
              <Button variant="ghost" size="icon" asChild>
                <Link href={userDetails.twitter_url}>
                  <TwitterIcon className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {userDetails.website_url && (
              <Button variant="ghost" size="icon" asChild>
                <Link href={userDetails.website_url}>
                  <LinkIcon className="h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">current streak</h2>
        <p>
          {current_streak}
          {" ships"}
        </p>

        <h2 className="text-xl font-bold mt-2">last ships</h2>
        {lastShips.length > 0 ? (
          <div className="pt-4 w-full flex flex-col gap-4 items-center">
            {lastShips.map((ship, index) => {
              if (index === 0) {
                return <EditableShipCard key={ship.id} ship={ship} />;
              } else {
                return <ShipCard key={ship.id} ship={ship} />;
              }
            })}
          </div>
        ) : (
          <p>{"no ships yet 😔"}</p>
        )}
      </CardContent>
    </Card>
  );
};
