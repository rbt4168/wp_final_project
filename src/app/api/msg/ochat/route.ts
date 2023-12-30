import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import PusherServer from "pusher";
function generateRandomString(length:number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

// console.log(process.env.MONGO_URL);

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

const client = new MongoClient(process.env.MONGO_URL!, {});

await client.connect();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Get the database and collection on which to run the operation
    const database = client.db("testaaa");
    const collection1 = database.collection(`chats_${body.uid1}`);
    const collection2 = database.collection(`chats_${body.uid2}`);

    const chat_id = generateRandomString(16);

    const query1 = {
        cid: chat_id, timestamp: new Date().getTime(), last_message:"", 
        name: body.name1
    };
    const query2 = {
        cid: chat_id, timestamp: new Date().getTime(), last_message:"", 
        name: body.name2
    };
    
    // Execute query
    let ans1 = await collection1.insertOne(query1);
    let ans2 = await collection2.insertOne(query2);
    pusherServer.trigger(`ch_${body.uid1}`, "evt", ".");
    pusherServer.trigger(`ch_${body.uid2}`, "evt", ".");

    // Print the document returned by findOne()
    // console.log(ans1, ans2);

    if(ans1 === null || ans2 === null) {
      return new NextResponse('db issue.', { status: 500 });
    }

    return NextResponse.json({ message: "Open Success" });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}