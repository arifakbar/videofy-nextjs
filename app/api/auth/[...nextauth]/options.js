import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import connect from "@/lib/db";
import User from "@/models/user";

export const AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // console.log("SESSION_HERE: ", session);
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id;
      return session;
    },
    async signIn({ profile }) {
      // console.log("PROFILE: ", profile);
      try {
        connect();
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          await User.create({
            email: profile.email,
            name: profile.name,
            profilePic: profile.image,
          });
        }
        return true;
      } catch (err) {
        consolelog(err);
        return false;
      }
    },
  },
};
