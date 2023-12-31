import { NextResponse } from "next/server";
import { db } from "@/db";
import { pictureTable, usersTable } from "@/db/schema";

import { eq, inArray } from "drizzle-orm";

import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const session_id = session?.user?.id;

    const [user] = await db
          .select({
            liked_user: usersTable.liked_user,
          })
          .from(usersTable)
          .where(eq(usersTable.displayId, session_id))
          .execute();
    // Query
    const likedUserIds = user.liked_user || [-100]; // Ensure this is always an array

    const followedLatestPicture = await db
      .select({
        pic_id: pictureTable.pic_id,
        tags: pictureTable.tags,
      })
      .from(pictureTable)
      .where(inArray(pictureTable.author_id, likedUserIds))
      .execute();
    
    const filteredForPrivate = followedLatestPicture.filter(
      picture => picture.tags &&
      !picture.tags.some(tag => tag.startsWith('private'))
    );

    const numberOfPicturesToExtract = Math.min(5, filteredForPrivate.length);

    const topPictures = filteredForPrivate
      .sort((a, b) => b.pic_id - a.pic_id)
      .slice(0, numberOfPicturesToExtract);
    
    const pictureIds = topPictures.map(picture => picture.pic_id);

    return NextResponse.json({ pictureIds });
  } catch (error) {
    console.error("/api/homeFollowedLatest :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
