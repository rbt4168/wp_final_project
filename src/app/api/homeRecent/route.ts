import { NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { pictureTable } from "@/db/schema"; // Import your UserTable if not already done

export async function GET(request: Request) {
  try {
    const recentpicture = await db
      .select({
        pic_id : pictureTable.pic_id,
        tags   : pictureTable.tags
      })
      .from(pictureTable)
      .execute();
    // Return the user information
    const filteredForPrivate = recentpicture.filter(picture => picture.tags && !picture.tags.some(tag => tag.startsWith('private')));
    const numberOfPicturesToExtract = Math.min(5, filteredForPrivate.length);
    const topPictures = filteredForPrivate.sort((a, b) => b.pic_id - a.pic_id).slice(0, numberOfPicturesToExtract);
    const pictureIds = topPictures.map(picture => picture.pic_id);
    return NextResponse.json({ pictureIds });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
