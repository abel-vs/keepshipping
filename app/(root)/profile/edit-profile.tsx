"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/providers/supabase-auth-provider";
import { updateUserDetails } from "@/lib/supabase/client";
import { UserDetails } from "@/lib/types";
import { GithubIcon, LinkIcon, LoaderIcon, TwitterIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const EditProfileDialog = ({ details }: { details: UserDetails }) => {
  const [username, setUsername] = useState(details.username);
  const [bio, setBio] = useState(details.bio);
  const [github_url, setGithubUrl] = useState(details.github_url);
  const [twitter_url, setTwitterUrl] = useState(details.twitter_url);
  const [website_url, setWebsiteUrl] = useState(details.website_url);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  if (!user) throw new Error("User is not logged in");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const twitterPattern = /^https:\/\/twitter\.com\/.*$/;
    const githubPattern = /^https:\/\/github\.com\/.*$/;
    if (!username) {
      toast.error("Username cannot be null");
      setLoading(false);
      return;
    }
    if (twitter_url && !twitterPattern.test(twitter_url)) {
      toast.error("Twitter URL must start with https://twitter.com/");
      setLoading(false);
      return;
    }
    if (github_url && !githubPattern.test(github_url)) {
      toast.error("GitHub URL must start with https://github.com/");
      setLoading(false);
      return;
    }
    const userDetails = {
      id: user.id,
      username,
      bio,
      github_url,
      twitter_url,
      website_url,
    };
    try {
      await updateUserDetails(userDetails);
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <form
          id="profile-form"
          onSubmit={onSubmit}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col items-start gap-2">
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
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="I am working on..."
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <Label htmlFor="name" className="text-left mt-2">
              Socials
            </Label>
            <div className="flex items-center gap-3 w-full">
              <GithubIcon className="h-5 w-5" />
              <Input
                id="github"
                value={github_url}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/hacker42"
              />
            </div>
            <div className="flex items-center gap-3 w-full">
              <TwitterIcon className="h-5 w-5" />
              <Input
                id="twitter"
                value={twitter_url}
                onChange={(e) => setTwitterUrl(e.target.value)}
                placeholder="https://twitter.com/hacker42"
              />
            </div>
            <div className="flex items-center gap-3 w-full">
              <LinkIcon className="h-5 w-5" />
              <Input
                id="website"
                value={website_url}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://mywebsite.com"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" className="w-full mt-2" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <LoaderIcon className="animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
