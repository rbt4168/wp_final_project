import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";

import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.username) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const Users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, session?.user?.username))
      .execute();
    
    return NextResponse.json({ Users });
  } catch (error) {
    console.error("/getNowUser :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
