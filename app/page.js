import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/custom/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen">
      <nav className="border-b">
        <div className="flex h-16 items-center px-4 container mx-auto justify-between">
          <h1 className="text-xl font-bold">AI Mock Interview</h1>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to AI Mock Interview
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Practice your interview skills with our AI interviewer
        </p>
        <Button asChild size="lg">
          <Link href="/auth/signin">Get Started</Link>
        </Button>
      </main>
    </div>
  );
}
