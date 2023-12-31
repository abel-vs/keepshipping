import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function Home() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center justify-center">
      <Card>
        <CardHeader className="font-bold text-xl">Web Starter</CardHeader>
        <CardContent>
          A template for web projects with Next.js 14, Tailwind CSS, Supabase &
          Shadcn UI.
        </CardContent>
      </Card>
    </div>
  );
}
