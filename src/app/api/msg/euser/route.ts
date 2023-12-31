import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// console.log(process.env.MONGO_URL);

const client = new MongoClient(process.env.MONGO_URL!, {});

await client.connect();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { account } = body;

    // Get the database and collection on which to run the operation
    const database = client.db("testaaa");
    const collection = database.collection("user");
    const query = { account: account };

    // Execute query
    const auser = await collection.findOne(query);

    // Print the document returned by findOne()
    // console.log(auser);

    if (auser === null) {
      return NextResponse.json({ message: "n" });
    } else {
      return NextResponse.json({ message: "e", account: auser.account , uid: auser.uid });
    }
  }  catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}