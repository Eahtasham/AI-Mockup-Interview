import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Navbar } from "@/components/custom/Navbar";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { users } from "@/utils/schema";

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  // Get user details from database
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email))
    .execute()
    .then(rows => rows[0]);

  return (
    <div>
      <Navbar user={user} />
      <main className="container mx-auto mt-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-bold mb-4">
              Welcome to your Dashboard
            </h1>
            <p className="text-muted-foreground">
              Hello {user.firstName} {user.lastName}, welcome to AI Mock Interview platform. 
              Here you can practice your interview skills with our AI interviewer.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 