import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { users } from "@/utils/schema";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        });

        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email))
          .execute()
          .then(rows => rows[0]);

        if (!existingUser) {
          const uniqueId = crypto.randomUUID();
          const names = user.name.split(" ");
          const now = new Date();
          
          await db.insert(users).values({
            email: user.email,
            firstName: names[0] || "",
            lastName: names[1] || "",
            uniqueId,
            provider: account.provider,
            createdAt: now,
            updatedAt: now
          }).execute();
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session?.user) {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, session.user.email))
          .execute()
          .then(rows => rows[0]);

        if (user) {
          session.user.id = user.id;
          session.user.uniqueId = user.uniqueId;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 