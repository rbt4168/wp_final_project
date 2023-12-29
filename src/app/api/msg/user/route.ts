import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

import Pusher from "pusher-js";

function generateRandomString(length:number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

const client = new MongoClient(process.env.MONGO_URL!, {});

await client.connect();

export const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  appId: process.env.PUSHER_ID!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

await pusher.connect();

export async function POST(request: Request) {
  console.log(process.env.MONGO_URL);
  try {
    const body = await request.json();
    console.log(body);

    const response = pusher.send_event("evt", {aaa: "0"}, "ch");
    console.log(response);
    // Connect the client to the server	(optional starting in v4.7)

    // Get the database and collection on which to run the operation
    const database = client.db("testaaa");
    const collection = database.collection("user");
    const query = { account: body.account };
    
    // Execute query
    let auser = await collection.findOne(query);

    if (auser === null) {
      await collection.insertOne({account: body.account, uid: generateRandomString(16)})
      auser = await collection.findOne(query);
    }

    // Print the document returned by findOne()
    console.log(auser);

    if(auser === null) {
      return new NextResponse('db issue.', { status: 500 });
    }

    return NextResponse.json({ message: JSON.stringify(auser)});
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}