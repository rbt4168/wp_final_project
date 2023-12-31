import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable, transactionTable } from "@/db/schema";

import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tacc, amount } = body;

    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const session_id = session?.user?.id;

    const [User] = await db
          .select({
            username: usersTable.username,
            coins: usersTable.coins,
          })
          .from(usersTable)
          .where(eq(usersTable.displayId, session_id))
          .execute();
    
    if (!User){
        return new NextResponse("No author you bad guy", { status: 401 });
    }

    if(tacc === User.username) {
      return new NextResponse("source-account equals dest-account", { status: 401 });
    }

    const [User2] = await db
          .select({
            username: usersTable.username,
            coins: usersTable.coins,
          })
          .from(usersTable)
          .where(eq(usersTable.username, tacc))
          .execute();
    
    if (!User2){
      return new NextResponse("Unknown Receiver", { status: 401 });
    }

    const amount_int = parseInt(amount);

    if(amount_int <= 0) {
      return new NextResponse("Negtive or zero amount", { status: 400 });
    }

    let user1count = (User.coins || 0);
    let user2count = (User2.coins || 0);

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

    return NextResponse.json({ newTx });
  } catch (error) {
    console.error("/api/transferCoin", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
