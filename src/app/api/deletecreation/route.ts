import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable, pictureTable } from "@/db/schema";

import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pic_id } = body

    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const session_id = session?.user?.id;

    const [User] = await db
          .select({
            username: usersTable.username,
            post_picture: usersTable.post_picture,
          })
          .from(usersTable)
          .where(eq(usersTable.displayId, session_id))
          .execute();
    
    if (!User){
        return new NextResponse("No author you bad guy", { status: 401 });
    }
    
    if (!User.post_picture){
        return new NextResponse("No author you bad guy", { status: 401 });
    }
    
    await db.delete(pictureTable)
      .where(eq(pictureTable.pic_id, pic_id));
    
    const currentPostPictures = User.post_picture;
    
    const updatedPostPictures = currentPostPictures.filter(id => id !== pic_id);
    
    await db
      .update(usersTable)
      .set({
        post_picture: updatedPostPictures,
      })
      .where(eq(usersTable.username, User.username || ""))
      .returning();

    return NextResponse.json({ pic_id });
  } catch (error) {
    console.error("/api/deletecreation :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
