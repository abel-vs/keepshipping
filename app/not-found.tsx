import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-3xl font-bold  md:text-5xl">Not Found</h1>
      <p className="p-4 text-xl">{"Couldn't find the requested page."}</p>
      <Button asChild className="mt-8">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
