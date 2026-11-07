import { Skeleton } from "@/components/ui/skeleton";
import { getSession } from "@/lib/auth/auth";
import dbConnect from "@/lib/dbConnect";
import { Board } from "@/lib/models";
import { Suspense } from "react";

async function getBoard(userId: string) {
  "use cache";
  await dbConnect();

  const data = await Board.findOne({
    userId,
    name: "Listing Board",
  });

  const board = JSON.parse(JSON.stringify(data));

  return board;
}

async function DashboardContent() {
  const session = await getSession();
  const board = await getBoard(session?.user.id || "");

  console.log(board);
  return (
    <section className="min-h-screen bg-white">
      <section className="container mx-auto p-6 border border-red-500">
        <article className="mb-6">
          <h1 className="text-3xl font-bold text-black">{board.name}</h1>
          <p className="text-muted-foreground">Track your job applications</p>
        </article>
      </section>
    </section>
  );
}

export default async function Dashboard() {
  return (
    <Suspense fallback={<Skeleton className="h-6 w-3xl" />}>
      <DashboardContent />
    </Suspense>
  );
}
