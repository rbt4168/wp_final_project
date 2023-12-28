import { NextResponse } from "next/server";
import { eq, or } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { transactionTable } from "@/db/schema"; // Import your UserTable if not already done

export async function GET(request: Request) {
  try {
    // Authentication
    const session = await auth();
    if (!session?.user?.username) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // Query
    const txs = await db
      .select()
      .from(transactionTable)
      .where(or(
        eq(transactionTable.from_user, session?.user?.username),
        eq(transactionTable.to_user, session?.user?.username)
      )).execute();
    
    // Return the user information
    return NextResponse.json({ txs });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
