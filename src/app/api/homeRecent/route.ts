import { NextResponse } from "next/server";
import { db } from "@/db";
import { pictureTable } from "@/db/schema";

export async function GET() {
  try {
    const recentpicture = await db
      .select({
        pic_id : pictureTable.pic_id,
        tags   : pictureTable.tags
      })
      .from(pictureTable)
      .execute();
    
    const filteredForPrivate = recentpicture.filter(
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
    console.error("/api/homeRecent :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
