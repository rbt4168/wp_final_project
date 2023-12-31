import { generateRandomString } from '@/lib/utils';
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const client = new MongoClient(process.env.MONGO_URL!, {});

await client.connect();
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const database = client.db("testaaa");
    const collection = database.collection("user");
    
    const query = { account: body.account };
    
    let auser = await collection.findOne(query);

    if (auser === null) {
      await collection.insertOne({account: body.account, uid: generateRandomString(16)})
      auser = await collection.findOne(query);
    }

    console.log("msg: login", auser);

    if(auser === null) {
      return new NextResponse('db issue.', { status: 500 });
    }

    return NextResponse.json({ message: JSON.stringify(auser)});
  } catch (error) {
    console.error("/api/msg/user :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}