import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable, pictureTable } from "@/db/schema";

import { eq, desc } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { author_id } = body;

    const [author] = await db.select({
      authorname: usersTable.username
    })
    .from(usersTable)
    .where(eq(usersTable.id, author_id));

    if (!author){
      return new NextResponse("Internal Error", { status: 500 });
    }

    const picturePopular = await db
      .select()
      .from(pictureTable)
      .where(eq(pictureTable.author_id, author_id))
      .orderBy(desc(pictureTable.liked_count))
      .execute();

    const prefix = `private-${author.authorname}`;

    const pictureIds = picturePopular.filter(
      picture => picture.tags && !picture.tags.some(tag => tag.startsWith(prefix))
    ).map(picture => picture.pic_id);

    return NextResponse.json({ pictureIds });
  } catch (error) {
    console.error("/api/authorPopular :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
