import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import clientPromise from "@/lib/mongodb";
import { MongoClient } from "mongodb";

// সরাসরি MongoClient থেকে ডাটাবেজ কানেক্ট করে অ্যাডাপ্টারে পাস করা
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const db = client.db("bazardor");

export const auth = betterAuth({
  appName: "BazarDor",
  baseURL: process.env.BETTER_AUTH_URL || "https://a7-bazardor-app.vercel.app",
  trustedOrigins: [process.env.BETTER_AUTH_URL],
  
  database: mongodbAdapter(db, {
    client,
  }),

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