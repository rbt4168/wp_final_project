import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable, pictureTable } from "@/db/schema";

import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pic_id, like } = body;

    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const session_id = session?.user?.id;

    const [User] = await db
          .select({
            username: usersTable.username
          })
          .from(usersTable)
          .where(eq(usersTable.displayId, session_id))
          .execute();
    
    if (!User){
        return new NextResponse("No author you bad guy", { status: 401 });
    }

    const [currentPicture] = await db
      .select({
        liked_count: pictureTable.liked_count,
      })
      .from(pictureTable)
      .where(eq(pictureTable.pic_id, parseInt(pic_id)));
    
    const [currentUser] = await db
      .select({
        liked_picture: usersTable.liked_picture,
      })
      .from(usersTable)
      .where(eq(usersTable.username,(session?.user?.username)));
    
    if (like && currentUser.liked_picture?.includes(parseInt(pic_id))) {
      return new NextResponse("Duplicated like", { status: 400 });
    } else if (!like && !currentUser.liked_picture?.includes(parseInt(pic_id))) {
      return new NextResponse("Not Existed like", { status: 400 });
    }

    let new_like_cnt;

    const currentLikedPictures = currentUser.liked_picture || [];

    let updatedLikedPictures = [];

    if(like) {
      new_like_cnt = (currentPicture.liked_count || 0) + 1;
      updatedLikedPictures = [...currentLikedPictures, parseInt(pic_id)];
    } else {
      new_like_cnt = (currentPicture.liked_count || 0) - 1;
      updatedLikedPictures = currentLikedPictures.filter(id => id !== parseInt(pic_id));
    }
    
    const [updatedPicture] = await db
      .update(pictureTable)
      .set({
        liked_count: new_like_cnt,
      })
      .where(eq(pictureTable.pic_id, parseInt(pic_id)))
      .returning();
    
    const [updatedUser] = await db
      .update(usersTable)
      .set({
        liked_picture: updatedLikedPictures,
      })
      .where(eq(usersTable.username, session?.user?.username))
      .returning();

    return NextResponse.json({ updatedUser, updatedPicture });
  } catch (error) {
    console.error("/api/likePicture :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
