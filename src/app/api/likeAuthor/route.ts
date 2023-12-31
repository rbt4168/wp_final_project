import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";

import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { author_id, like } = body;

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
    
    const [currentUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, User.username || ""));
    
    if (like && currentUser.liked_user?.includes(parseInt(author_id))) {
      return new NextResponse("Duplicated like", { status: 400 });
    } else if (!like && !currentUser.liked_user?.includes(parseInt(author_id))) {
      return new NextResponse("Not Existed like", { status: 400 });
    }

    const currentLikedUser = currentUser.liked_user || [];

    let updatedLikedUser = [];

    if(like) {
      updatedLikedUser = [...currentLikedUser, parseInt(author_id)];
    } else {
      updatedLikedUser = currentLikedUser.filter(id => id !== parseInt(author_id));
    }
    
    const [updatedUser] = await db
      .update(usersTable)
      .set({
        liked_user: updatedLikedUser,
      })
      .where(eq(usersTable.username, session?.user?.username))
      .returning();

    return NextResponse.json({ updatedUser });
  } catch (error) {
    console.error("/api/likeAuthor :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}