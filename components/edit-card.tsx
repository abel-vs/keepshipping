import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Ship } from "@/lib/types";
import { editShip } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { DialogClose } from "./ui/dialog";

export const EditCard = ({ ship }: { ship: Ship }) => {
  const [description, setDescription] = useState(ship.description);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    if (description.trim() === "") {
      toast.error("Description cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      await editShip({ ...ship, description });
      toast.success("You shipped!");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong.", { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        placeholder="today i shipped..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
      />
      <DialogClose asChild>
        <Button type="submit" onClick={onSubmit} disabled={loading}>
          {loading ? <LoaderIcon className="animate-spin" /> : "ship"}
        </Button>
      </DialogClose>
    </div>
  );
};
