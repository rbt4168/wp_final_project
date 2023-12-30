import { generateRandomString } from '@/lib/utils';
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const client = new MongoClient(process.env.MONGO_URL!, {});

await client.connect();
export async function POST(request: Request) {
  try {
    const body = await request.json();

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
    console.log("msg: login");
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