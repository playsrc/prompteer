import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import { prisma, stripe } from "src/utility";
import type { Adapter } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session!.user!.id = user!.id;

      const dbUser = await prisma.user.findFirst({
        where: {
          id: user.id,
        },
      });

      session!.user!.stripeCustomerId = dbUser?.stripeCustomerId!;
      session!.user!.stripeActive = dbUser?.stripeActive!;

      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      await stripe.customers
        .create({
          name: user.name as string,
          email: user.email as string,
        })
        .then(async (customer) =>
          prisma.user.update({
            where: { id: user.id },
            data: {
              stripeCustomerId: customer.id,
            },
          })
        );
    },
  },
};

export default NextAuth(authOptions);
