import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import PusherServer from "pusher";

// console.log(process.env.MONGO_URL);

const client = new MongoClient(process.env.MONGO_URL!, {});

await client.connect();

// console.log(process.env.MONGO_URL);

const pusherServer = new PusherServer({
  appId: process.env.PUSHER_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

// {cid: , id: , vis: }
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Get the database and collection on which to run the operation
    const database = client.db("testaaa");
    const collection = database.collection(`messages_${body.cid}`);

    let amsg;
    if( body.vis === -1) {
      amsg = await collection.updateMany(
        { visible: -1 },
        { $set: { visible: 3 } },
      )
      amsg = await collection.updateOne(
        { _id: new ObjectId(body.id) },
        { $set: { visible: body.vis } },
      )
      // console.log(amsg);
    } else {
      amsg = await collection.updateOne(
        { _id: new ObjectId(body.id) },
        { $set: { visible: body.vis } },
      )
      // console.log(amsg);
    }

    // trigger renew
    pusherServer.trigger(`ch_${body.cid}`, "evt", ".");

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