import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { usersTable } from "@/db/schema"; // Import your UserTable if not already done
import { MongoClient } from 'mongodb';
import { generateRandomString } from "@/lib/utils";
import PusherServer from "pusher";

const pusherServer = new PusherServer({
  appId: process.env.PUSHER_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

const client = new MongoClient(process.env.MONGO_URL!, {});

await client.connect();

export async function POST(request: Request) {
  try {
    // Authentication
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extract data from request body
    const body = await request.json();
    const { author } = body;

    console.log(author);
    
    // Assume you have a user table where you want to update this information
    // and 'userId' is obtained from the session or some other source
    const session_id = session?.user?.id; // Replace with actual way to get the user's ID


    const [User] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.displayId, session_id))
          .execute();
    
    // Update user profile in the database
    if (!User){
        return new NextResponse("No author you bad guy", { status: 401 });
    }

    // Get the database and collection on which to run the operation
    const database = client.db("testaaa");
    const collection = database.collection("user");

    const query_user = { account: User.username };
    const query_author = { account: author };
    
    // Execute query
    let auser = await collection.findOne(query_user);
    let aauthor = await collection.findOne(query_author);

    if (auser === null) {
      await collection.insertOne({account: User.username, uid: generateRandomString(16)});

      auser = await collection.findOne(query_user);
    }

    if(aauthor === null) {
      await collection.insertOne({account: author, uid: generateRandomString(16)});

      aauthor = await collection.findOne(query_author);
    }

    if(auser?.uid === aauthor?.uid) {
      return new NextResponse("Talk to self.", { status: 403 });
    }
    
    const collection_chat = database.collection(`chats_${auser?.uid}`);
    const query_name = { name: aauthor?.account };
    
    // Execute query
    const iuser = await collection_chat.findOne(query_name);

    // Print the document returned by findOne()
    // console.log(auser);

    if (iuser === null) {
      const collection1 = database.collection(`chats_${auser?.uid}`);
      const collection2 = database.collection(`chats_${aauthor?.uid}`);

      const chat_id = generateRandomString(16);

      const query1 = {
          cid: chat_id, timestamp: new Date().getTime(), last_message:"", 
          name: aauthor?.account
      };

      const query2 = {
          cid: chat_id, timestamp: new Date().getTime(), last_message:"", 
          name: auser?.account
      };
      
      // Execute query
      const ans1 = await collection1.insertOne(query1);
      const ans2 = await collection2.insertOne(query2);

      await pusherServer.trigger(`ch_${auser?.uid}`, "evt", ".");
      await pusherServer.trigger(`ch_${aauthor?.uid}`, "evt", ".");

      // Print the document returned by findOne()
      // console.log(ans1, ans2);

      if(ans1 === null || ans2 === null) {
        return new NextResponse('db issue.', { status: 500 });
      }

      return NextResponse.json({ message: "Open Success" });
    } else {
      return NextResponse.json({ message: "success" });
    }

  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
