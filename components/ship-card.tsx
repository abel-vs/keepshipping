"use client";
import { Ship } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { Button } from "./ui/button";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { toast } from "sonner";
import { deleteShip } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { EditCard } from "./edit-card";

export const ShipCard = ({ ship }: { ship: Ship }) => {
  return (
    <div className="flex items-center bg-secondary w-full max-w-3xl rounded-md px-4 py-2">
      <span className="mr-4 text-xl">🚢</span>{" "}
      <span className="flex-grow font-medium text-left">
        {ship.description}
      </span>
      <span className="text-sm text-neutral-500">
        {formatDateTime(ship.date)}
      </span>
    </div>
  );
};

export const EditableShipCard = ({ ship }: { ship: Ship }) => {
  const router = useRouter();
  const onDelete = async () => {
    try {
      await deleteShip(ship);
      router.refresh();
      toast.success("You deleted this ship!");
    } catch (error: any) {
      toast.error("Failed to delete ship: " + error.message);
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="w-full flex items-center justify-center">
        <ShipCard ship={ship} />
      </PopoverTrigger>
      <PopoverContent className="p-2 flex gap-2 w-min">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="ghost">
              <Edit3 size={20} className="mr-2" />
              edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit ship</DialogTitle>
            </DialogHeader>
            <EditCard ship={ship} />
          </DialogContent>
        </Dialog>
        <Button size="sm" variant="ghost" onClick={onDelete}>
          <Trash2 size={20} className="mr-2" /> delete
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export const AddShipCard = () => {
  return (
    <button className="flex items-center hover:bg-secondary w-full max-w-3xl rounded-md hover:border-neutral-400 text-neutral-300 hover:text-neutral-400  border border-2 border-dashed p-2 transition duration-300 ease-in-out">
      <Plus size={28} className="mr-2" />
      <span className="flex-grow text-left">ship some more</span>
    </button>
  );
};
