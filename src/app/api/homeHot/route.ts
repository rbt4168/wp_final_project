import { NextResponse } from "next/server";
import { db } from "@/db";
import { pictureTable } from "@/db/schema";

export async function GET() {
  try {
    const hotpicture = await db
      .select({
        pic_id: pictureTable.pic_id,
        tags: pictureTable.tags,
        liked_count: pictureTable.liked_count
      })
      .from(pictureTable)
      .execute();

    const filteredForPrivate = hotpicture.filter(
      picture => picture.tags &&
      !picture.tags.some(tag => tag.startsWith('private'))
    );

    const numberOfPicturesToExtract = Math.min(5, filteredForPrivate.length);
    const topPictures = filteredForPrivate.sort((a, b) => {
      const likeA = a.liked_count ?? 0;
      const likeB = b.liked_count ?? 0;
      return likeB - likeA;
    }).slice(0, numberOfPicturesToExtract);

    const pictureIds = topPictures.map(picture => picture.pic_id);

    return NextResponse.json({ pictureIds });
  } catch (error) {
    console.error("/api/homeHot :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
