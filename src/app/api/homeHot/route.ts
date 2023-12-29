import { NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { pictureTable } from "@/db/schema"; // Import your UserTable if not already done
import OwnedTags from "@/app/profile/_components/ownedtag";

export async function GET(request: Request) {
  try {
    // Authentication
    

    // Query
    const hotpicture = await db
      .select({
        pic_id: pictureTable.pic_id,
        tags: pictureTable.tags,
        liked_count: pictureTable.liked_count
      })
      .from(pictureTable)
      .execute();

    const filteredForPrivate = hotpicture.filter(picture => picture.tags && !picture.tags.some(tag => tag.startsWith('private')));
    const numberOfPicturesToExtract = Math.min(5, filteredForPrivate.length);
    const topPictures = filteredForPrivate.sort((a, b) => {
      const likeA = a.liked_count ?? 0;
      const likeB = b.liked_count ?? 0;
      return likeB - likeA;
    }).slice(0, numberOfPicturesToExtract);
    const pictureIds = topPictures.map(picture => picture.pic_id);
    return NextResponse.json({ pictureIds });

    
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
