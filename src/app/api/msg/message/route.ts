import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import PusherServer from "pusher";

// console.log(process.env.MONGO_URL);

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
    // const { uid, cid, content, oppo } = body;
    
    // Get the database and collection on which to run the operation
    const database = client.db("testaaa");
    const collection = database.collection(`messages_${body.cid}`);
    const query = { 
        content: body.content, uid: body.uid,
        visible: 3, timestamp: new Date().getTime()
    };

    const user1 = database.collection(`chats_${body.uid}`);
    const user2 = database.collection(`chats_${body.oppo}`);
    await user1.updateOne(
      { cid: body.cid },
      { $set: { last_message: body.content, timestamp: new Date().getTime() } },
    )
    await pusherServer.trigger(`ch_${body.uid}`, "evt", ".");
    await user2.updateOne(
      { cid: body.cid },
      { $set: { last_message: body.content, timestamp: new Date().getTime() } },
    )
    await pusherServer.trigger(`ch_${body.oppo}`, "evt", ".");
    
    // Execute query
    let amsg = await collection.insertOne(query);
    await pusherServer.trigger(`ch_${body.cid}`, "evt", ".");
    // trigger renew

    // console.log(amsg);
    if(amsg === null) {
      return new NextResponse('db issue.', { status: 500 });
    }

    return NextResponse.json({ message: JSON.stringify(amsg)});
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}