import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { transactionTable, usersTable } from "@/db/schema"; // Import your UserTable if not already done

export async function POST(request: Request) {
  try {
    // Authentication
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extract data from request body
    const body = await request.json();
    const { tacc, amount } = body;
    
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

    if(tacc === User.username) {
      return new NextResponse("source-account equals dest-account", { status: 401 });
    }

    const [User2] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.username, tacc))
          .execute();
    
    // Update user profile in the database
    if (!User2){
      return new NextResponse("Unknown Receiver", { status: 401 });
    }

    let user1count = (User.coins || 0);
    let user2count = (User2.coins || 0);
    const amount_int = parseInt(amount);

    if(amount_int <= 0) {
      return new NextResponse("Negtive or zero amount", { status: 400 });
    }

    if(user1count < amount_int) {
      return new NextResponse("Not Enough Money", { status: 400 });
    }

    user1count -= amount_int;
    user2count += amount_int;

    // Update the user's record
    const [updatedUser] = await db
      .update(usersTable)
      .set({
        coins: user1count,
      })
      .where(eq(usersTable.username, session?.user?.username))
      .returning();

    const [updatedUser2] = await db
      .update(usersTable)
      .set({
        coins: user2count,
      })
      .where(eq(usersTable.username, tacc))
      .returning();

    const [ newTx ] = await db
      .insert(transactionTable)
      .values({
        to_user: updatedUser2.username,
        from_user: updatedUser.username,
        amount: amount_int,
        timestamp: Date.now().toString()
      }).returning()

    // Return the updated user information
    return NextResponse.json({ newTx });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
