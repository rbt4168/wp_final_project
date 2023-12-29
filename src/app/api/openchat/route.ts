import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { usersTable } from "@/db/schema"; // Import your UserTable if not already done
import axios from "axios";

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

    let eauthor = await axios.post("http://localhost:3000/api/msg/euser", {account: author});
    if(eauthor.data.message === "n") {
      let pauthor = await axios.post("http://localhost:3000/api/msg/user", {test: "test", account: author});
      eauthor = await axios.post("http://localhost:3000/api/msg/euser", {account: author});
    }

    let euser = await axios.post("http://localhost:3000/api/msg/euser", {account: User.username});
    if(euser.data.message === "n") {
      let puser = await axios.post("http://localhost:3000/api/msg/user", {test: "test", account: User.username});
      euser = await axios.post("http://localhost:3000/api/msg/euser", {account: User.username});
    }

    console.log(eauthor, euser);

    let echat = await axios.post("http://localhost:3000/api/msg/echat", {uid: euser.data.uid, name: author});
    if(echat.data.message === "e") {
      return new NextResponse("Duplicate chat.", { status: 403 });
    }

    if(euser.data.uid === eauthor.data.uid) {
      return new NextResponse("Talk to self.", { status: 403 });
    }

    let oc_payload = {
      uid1: euser.data.uid, uid2: eauthor.data.uid,
      name1: eauthor.data.account, name2: euser.data.account
    }

    let res = await axios.post("http://localhost:3000/api/msg/ochat", oc_payload);

    return NextResponse.json({ res });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
