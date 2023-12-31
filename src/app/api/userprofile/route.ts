import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";

import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, quote, title, bio, links } = body;

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
        name: name,
        quote: quote,
        title: title,
        bio: bio,
        links: links // String, seperate by ','
      })
      .where(eq(usersTable.username, User.username || "")) // Assuming 'id' is the user identifier in your table
      .returning();
    
    return NextResponse.json({ updatedUser });
  } catch (error) {
    console.error("/api/userprofile :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
