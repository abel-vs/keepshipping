"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addShip } from "@/lib/supabase/client";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SubmitShipSection() {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const router = useRouter();

  const onSubmit = async () => {
    setLoading(true);
    try {
      await addShip(description);
      toast.success("You shipped!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold">what did you ship today?</h1>
      <div className="flex w-full max-w-sm items-center space-x-2 mt-8">
        <Input
          placeholder="today i shipped..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" onClick={onSubmit} disabled={loading}>
          {loading ? <LoaderIcon className="animate-spin" /> : "ship"}
        </Button>
      </div>
    </>
  );
}
