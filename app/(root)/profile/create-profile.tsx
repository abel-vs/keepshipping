"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUserDetails, updateUserDetails } from "@/lib/supabase/client";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const CreateProfileCard = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [github_url, setGithubUrl] = useState("");
  const [twitter_url, setTwitterUrl] = useState("");
  const [website_url, setWebsiteUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!username) {
      toast.error("Username cannot be null");
      return;
    }
    const userDetails = {
      username,
      bio,
      github_url,
      twitter_url,
      website_url,
    };
    try {
      await createUserDetails(userDetails);
      router.refresh();
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error("An error occurred while updating the profile", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <div className="flex justify-between w-full items-start">
          <div>
            <CardTitle>Create your profile</CardTitle>
            <CardDescription className="mt-1">
              You need to create a profile before you can start shipping.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col items-start gap-2 py-2">
            <Label htmlFor="name" className="text-right">
              Username
            </Label>
            <Input
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="hacker42"
            />
          </div>
          <div className="flex flex-col items-start gap-2 py-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="I am working on..."
            />
          </div>
          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <LoaderIcon className="animate-spin" />
                <span>Creating...</span>
              </div>
            ) : (
              "Create Profile"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
