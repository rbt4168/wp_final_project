// import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// dotenv.config();
// console.log(process.env.MONGO_URL);

const client = new MongoClient(process.env.MONGO_URL!, {});

await client.connect();

// {uid: , name:}
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { uid, name } = body;
    
    const database = client.db("testaaa");
    const collection = database.collection(`chats_${uid}`);
    const query = { name: name };
    
    // Execute query
    const auser = await collection.findOne(query);

    // Print the document returned by findOne()
    // console.log(auser);

    if (auser === null) {
      return NextResponse.json({ message: "n" });
    } else {
      return NextResponse.json({ message: "e" });
    }
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}