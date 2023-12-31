import { NextResponse } from "next/server";
import { db } from "@/db";
import { transactionTable } from "@/db/schema";

import { eq, or } from "drizzle-orm";

import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.username) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const txs = await db
      .select()
      .from(transactionTable)
      .where(or(
        eq(transactionTable.from_user, session?.user?.username),
        eq(transactionTable.to_user, session?.user?.username)
      )).execute();
    
    return NextResponse.json({ txs });
  } catch (error) {
    console.error("/api/getTx :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
