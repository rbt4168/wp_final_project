import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// console.log(process.env.MONGO_URL);

const client = new MongoClient(process.env.MONGO_URL as string, {});

await client.connect();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { uid } = body;
    // console.log(body);

    const database = client.db("testaaa");
    const collection = database.collection(`chats_${uid}`);
    const query = {};

    // Execute query
    let ans = await collection.find(query).toArray();

    // Print the document returned by findOne()
    // console.log(ans);

    if (ans === null) {
      return new NextResponse('db issue.', { status: 500 });
    }

    return NextResponse.json({ message: JSON.stringify(ans)});
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}