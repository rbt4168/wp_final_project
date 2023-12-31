import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import PusherServer from "pusher";

const client = new MongoClient(process.env.MONGO_URL!, {});

await client.connect();

const pusherServer = new PusherServer({
  appId: process.env.PUSHER_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

// {uid: , cid: , content:, oppo: }
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { uid, cid, content, oppo } = body;
    
    const database = client.db("testaaa");
    const collection = database.collection(`messages_${cid}`);
    const query = { 
        content: content, uid: uid,
        visible: 3, timestamp: new Date().getTime()
    };

    const user1 = database.collection(`chats_${uid}`);
    const user2 = database.collection(`chats_${oppo}`);

    await user1.updateOne(
      { cid: cid },
      { $set: { last_message: content, timestamp: new Date().getTime() } },
    )
    await user2.updateOne(
      { cid: cid },
      { $set: { last_message: content, timestamp: new Date().getTime() } },
    )
    const amsg = await collection.insertOne(query);

    await pusherServer.trigger(`ch_${uid}`, "evt", ".");
    await pusherServer.trigger(`ch_${oppo}`, "evt", ".");
    await pusherServer.trigger(`ch_${cid}`, "evt", ".");

    if(amsg === null) {
      return new NextResponse('db issue.', { status: 500 });
    }

    return NextResponse.json({ message: JSON.stringify(amsg)});
  } catch (error) {
    console.error("/api/msg/message :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}