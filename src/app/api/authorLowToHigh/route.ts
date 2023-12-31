import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable, pictureTable } from "@/db/schema";

import { eq, asc } from "drizzle-orm";

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

    const pictureLowToHigh = await db
      .select()
      .from(pictureTable)
      .where(eq(pictureTable.author_id, author_id))
      .orderBy(asc(pictureTable.pic_id))
      .execute();
      
    const prefix = `private-${author.authorname}`;
    
    const pictureIds = pictureLowToHigh.filter(
      picture => picture.tags && !picture.tags.some(tag => tag.startsWith(prefix))
    ).map(picture => picture.pic_id);
    
    return NextResponse.json({ pictureIds });
  } catch (error) {
    console.error("/api/authorLowToHigh :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
