import { NextResponse } from "next/server";
import { db } from "@/db";
import { pictureTable } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pic_id } = body;

    const allPicture = await db
      .select({
        pic_id : pictureTable.pic_id,
        tags   : pictureTable.tags
      })
      .from(pictureTable)
      .execute();
    
    const filteredForPrivate = allPicture.filter(
      picture => Array.isArray(picture.tags) &&
      !picture.tags.some(tag => tag.startsWith('private'))
    );

    const filteredForPicId = filteredForPrivate.filter(
      picture => (picture.pic_id !== pic_id)
    );

    const numberOfPicturesToSelect = Math.min(5, filteredForPicId.length);
    const shuffledPictures = filteredForPicId.sort(() => 0.5 - Math.random());

    const selectedPictures = shuffledPictures.slice(0, numberOfPicturesToSelect);
    const pictureIds = selectedPictures.map(picture => picture.pic_id);
    
    return NextResponse.json({ pictureIds });
  } catch (error) {
    console.error("/api/relatedWorks :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
