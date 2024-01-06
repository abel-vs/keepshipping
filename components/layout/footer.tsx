import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export const Footer = () => {
  return (
    <footer className="w-full hidden md:block  border-t border-t-foreground/10  pl-4 pr-2 md:px-8 py-2 md:py-4 flex items-center justify-between text-center text-xs">
      <p>a social media for builders.</p>
      <Button asChild variant="ghost">
        <Link
          href={process.env.NEXT_PUBLIC_GITHUB_URL || ""}
          className="flex items-center gap-2 text-xs"
        >
          contribute on <GithubIcon size={16} />{" "}
        </Link>
      </Button>
    </footer>
  );
};
