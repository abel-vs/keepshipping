import { ShipCard } from "@/components/ship-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Ship, UserDetails } from "@/lib/types";
import { GithubIcon, TwitterIcon, LinkIcon } from "lucide-react";
import Link from "next/link";

export const ProfileCard = ({
  userDetails,
  lastShips,
}: {
  userDetails: UserDetails;
  lastShips: Ship[];
}) => {
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
            <Button variant="ghost" size="icon" asChild>
              <Link href={userDetails.github_url || ""}>
                <GithubIcon className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href={userDetails.twitter_url || ""}>
                <TwitterIcon className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href={userDetails.website_url || ""}>
                <LinkIcon className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">last ships</h2>
        <div className="pt-4 w-full flex flex-col gap-4 items-center">
          {lastShips.map((ship) => (
            <ShipCard key={ship.id} ship={ship} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
