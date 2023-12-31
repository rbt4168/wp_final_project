import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";

import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tags, prices } = body;

    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const session_id = session?.user?.id;

    const [User] = await db
          .select({
            username: usersTable.username,
          })
          .from(usersTable)
          .where(eq(usersTable.displayId, session_id))
          .execute();
    
    if (!User){
        return new NextResponse("No author you bad guy", { status: 401 });
    }

    const [updatedUser] = await db
      .update(usersTable)
      .set({
        private_tags: tags,
        private_tags_cost: prices,
      })
      .where(eq(usersTable.username, User.username || ""))
      .returning();

    return NextResponse.json({ updatedUser });
  } catch (error) {
    console.error("/api/savePrivateTags :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
