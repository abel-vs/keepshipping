import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function Home() {
  return (
    <div className="flex-1 w-full flex flex-col gap-4 items-center justify-center">
      <span className="text-7xl">🚢</span>

      <h1 className="text-4xl font-bold">keep shipping.</h1>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input placeholder="today i shipped..." />
        <Button type="submit">ship</Button>
      </div>
    </div>
  );
}
