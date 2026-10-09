
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI পাওয়া যায়নি");
}

const globalWithMongo = globalThis;

const client =
  globalWithMongo._mongoClient ||
  new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalWithMongo._mongoClient = client;
}

const db = client.db("bazardor");

export { client, db };