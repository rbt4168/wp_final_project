import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const client = new MongoClient(process.env.MONGO_URL!, {});

await client.connect();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { uid, name } = body;
    
    const database = client.db("testaaa");
    const collection = database.collection(`chats_${uid}`);
    const query = { name: name };
    
    const auser = await collection.findOne(query);

    if (auser === null) {
      return NextResponse.json({ message: "n" });
    } else {
      return NextResponse.json({ message: "e" });
    }
  } catch (error) {
    console.error("/api/msg/echat :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}