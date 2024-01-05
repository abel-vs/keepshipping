"use client";
import { useState, useEffect } from "react";
import { Ship } from "@/lib/types";
import { useAuth } from "@/lib/providers/supabase-auth-provider";
import { Button } from "./ui/button";
import { checkIfUserLiked, countLikes, likePost } from "@/lib/supabase/client";
import { HeartIcon as FullHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as EmptyHeartIcon } from "@heroicons/react/24/outline";

export const LikeButton = ({ ship }: { ship: Ship }) => {
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLikes = async () => {
      const totalLikes = await countLikes(ship.id);
      setLikes(totalLikes);
    };

    fetchLikes();
  }, [ship.id]);

  useEffect(() => {
    if (!user) return;
    const checkLiked = async () => {
      const userLiked = await checkIfUserLiked(ship.id, user.id);
      setLiked(userLiked);
    };

    checkLiked();
  }, [ship.id, user]);

  const handleLike = async () => {
    if (!user) return;
    if (user.id === ship.user_id) return;

    const hasLiked = await likePost(ship.id, user.id);
    const newLikes = await countLikes(ship.id);
    setLikes(newLikes);
    setLiked(hasLiked);
  };

  return (
    <Button
      variant="ghost"
      className="flex items-center"
      onClick={handleLike}
      disabled={user?.id === ship.user_id}
    >
      {liked ? (
        <FullHeartIcon className="h-5 w-5 text-red-500" />
      ) : (
        <EmptyHeartIcon className="h-5 w-5 text-neutral-500" />
      )}
      {likes !== null && (
        <span className="ml-1 text-sm text-neutral-500">{likes}</span>
      )}
    </Button>
  );
};
