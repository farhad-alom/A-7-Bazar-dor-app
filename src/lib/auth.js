import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { client, db } from "@/lib/mongodb";

export const auth = betterAuth({
  appName: "BazarDor",
  baseURL: process.env.BETTER_AUTH_URL || "https://a7-bazardor-app.vercel.app", // এটি ভিভার্সেল লাইভ ইউআরএল রিড করবে
  trustedOrigins: [process.env.BETTER_AUTH_URL], // ক্রস-ডোমেন রিকোয়েস্ট সুরক্ষিত রাখতে
  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
});