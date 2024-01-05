"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserDetails } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { Check, SearchIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";

export function SearchBar() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [users, setUsers] = React.useState<UserDetails[]>([]);

  const supabase = createClient();

  React.useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("user_details").select("*");

      if (error) {
        console.error(error);
        return;
      }

      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] flex justify-start items-center"
        >
          <SearchIcon className="mr-2 h-4 w-4" />
          {value
            ? users.find((user) => user.username === value)?.username
            : "Search builders..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 z-20">
        <Command>
          <CommandInput placeholder="Search builders..." />
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup>
            {users.map((user) => (
              <Link key={user.id} href={`/profile/${user.id}`}>
                <CommandItem
                  key={user.username}
                  value={user.username}
                  className="pl-2"
                  onClick={() => setOpen(false)}
                >
                  {user.username}
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
