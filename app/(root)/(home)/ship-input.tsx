"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addShip } from "@/lib/supabase/client";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ShipInput({ text }: { text: string }) {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const router = useRouter();

  const onSubmit = async () => {
    if (description.trim() === "") {
      toast.error("Description cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      await addShip(description);
      toast.success("You shipped!");
      router.refresh();
      setDescription("");
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong.", { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center space-x-2">
      <Input
        placeholder={text}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
      />
      <Button type="submit" onClick={onSubmit} disabled={loading}>
        {loading ? <LoaderIcon className="animate-spin" /> : "ship"}
      </Button>
    </div>
  );
}
