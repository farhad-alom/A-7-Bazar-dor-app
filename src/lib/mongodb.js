// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
// const options = {};

// if (!uri) {
//   throw new Error("MONGODB_URI পাওয়া যায়নি");
// }

// let client;
// let clientPromise;

// if (process.env.NODE_ENV === "development") {

//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {

//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default clientPromise;

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error("MONGODB_URI পাওয়া যায়নি");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// BetterAuth-এর সঠিক অ্যাডাপ্টারের জন্য সরাসরি db ইনস্ট্যান্স ও client এক্সপোর্ট করা হলো
export async function getDb() {
  const connectedClient = await clientPromise;
  return connectedClient.db("bazardor");
}

export default clientPromise;