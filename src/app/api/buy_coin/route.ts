import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable, transactionTable } from "@/db/schema";

import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { coins } = body;

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

    let newcoin;
    if (User.coins === null) {
      newcoin = Number(coins);
    } else {
      newcoin = Number(coins) + Number(User.coins);
    }
    // Update the user's record
    const [updatedUser] = await db
      .update(usersTable)
      .set({
        coins: newcoin,
      })
      .where(eq(usersTable.username, User.username || ""))
      .returning();
      
    const [ newTx ] = await db
      .insert(transactionTable)
      .values({
        to_user: updatedUser.username,
        from_user: "system",
        amount: coins,
        timestamp: Date.now().toString()
      }).returning()
    
    return NextResponse.json({ updatedUser, newTx });
  } catch (error) {
    console.error("/api/buy_coin :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
