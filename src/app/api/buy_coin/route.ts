import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { pictureTable, usersTable } from "@/db/schema"; // Import your UserTable if not already done

export async function POST(request: Request) {
  try {
    // Authentication
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extract data from request body
    const body = await request.json();
    
    // Assume you have a user table where you want to update this information
    // and 'userId' is obtained from the session or some other source
    const session_id = session?.user?.id; // Replace with actual way to get the user's ID


    const [User] = await db
          .select({coins: usersTable.coins})
          .from(usersTable)
          .where(eq(usersTable.displayId, session_id))
          .execute();
    
    // Update user profile in the database


    if (!User){
        // console.log("fefefe");
        return new NextResponse("No author you bad guy", { status: 401 });
    }

    console.log(User.coins);
    console.log(body.coins);
    if (User.coins === null){
        return new NextResponse("No author you bad guy", { status: 403 });
    }
    const newcoin = Number(body.coins) + Number(User.coins);
 
    console.log(newcoin);
    // Update the user's record
    const [updatedUser] = await db
      .update(usersTable)
      .set({
        coins: newcoin,
      })
      .where(eq(usersTable.username, session?.user?.username))
      .returning();

    // Return the updated user information
    return NextResponse.json({ newcoin });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
