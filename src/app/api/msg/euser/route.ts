import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const client = new MongoClient(process.env.MONGO_URL!, {});

await client.connect();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { account } = body;

    const database = client.db("testaaa");
    const collection = database.collection("user");
    const query = { account: account };

    const auser = await collection.findOne(query);

    if (auser === null) {
      return NextResponse.json({ message: "n" });
    } else {
      return NextResponse.json({ message: "e", account: auser.account , uid: auser.uid });
    }
  }  catch (error) {
    console.error("/api/msg/euser :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}