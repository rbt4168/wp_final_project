import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable, pictureTable } from "@/db/schema";

import { eq, desc } from "drizzle-orm";

import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {author_id} = body;

    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const session_id = session?.user?.id;

    const [User] = await db
          .select({
            author: usersTable.name,
            id   : usersTable.id,
            owned_private_tag : usersTable.owned_private_tag,
          })
          .from(usersTable)
          .where(eq(usersTable.displayId, session_id))
          .execute();

    if (!User) {
        return new NextResponse("No author you bad guy", { status: 401 });
    }
    
    const pictures = await db
      .select({
        pic_id: pictureTable.pic_id,
        tags: pictureTable.tags
      })
      .from(pictureTable)
      .where(eq(pictureTable.author_id, author_id))
      .orderBy(desc(pictureTable.pic_id))
      .execute();
    
    if (!User.owned_private_tag || User.owned_private_tag.length === 0) {
      return NextResponse.json("No picture", { status: 404 });
    }

    const pictureArray = pictures as { pic_id: number; tags: string[] | null } [];

    const pictureIds = pictureArray.filter(
      picture => picture.tags && picture.tags.some(tag => User.owned_private_tag && User.owned_private_tag.includes(tag))
    ).map(picture => picture.pic_id);

    return NextResponse.json({ pictureIds });
  } catch (error) {
    console.error("/api/authorTag :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
