
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const client = new MongoClient(process.env.MONGO_URL!, {});

await client.connect();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cid } = body;

    const database = client.db("testaaa");
    const collection = database.collection(`messages_${cid}`);
    const query = {};
    
    const ans = await collection.find(query).toArray();

    if(ans === null) {
      return new NextResponse('db issue.', { status: 500 });
    }

    return NextResponse.json({ message: JSON.stringify(ans)});
  } catch (error) {
    console.error("/api/msg/gmsg :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}