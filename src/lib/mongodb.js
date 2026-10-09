import { MongoClient } from "mongodb";
// import dns from "node:dns";
// dns.setDefaultResultOrder("ipv4first");
// dns.setServers(["8.8.8.8", "1.1.1.1"]);

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI পাওয়া যায়নি");
}

const client = new MongoClient(uri);
const db = client.db("bazardor"); //

export { client, db };