import { NextResponse } from "next/server";
import { db } from "@/db";
import { pictureTable } from "@/db/schema"; // Import your UserTable if not already done

export async function POST(request: Request) {
  try {
    // Authentication
    const body = await request.json();
    const { pic_id } = body;

    // Query
    const allPicture = await db
      .select({
        pic_id : pictureTable.pic_id,
        tags   : pictureTable.tags
      })
      .from(pictureTable)
      .execute();
    //console.log(hotpicture);
    // Return the user information
    const filteredForPrivate = allPicture.filter(picture => Array.isArray(picture.tags) && !picture.tags.some(tag => tag.startsWith('private')));
    const filteredForPicId = filteredForPrivate.filter(picture => (picture.pic_id !== pic_id));
    const numberOfPicturesToSelect = Math.min(5, filteredForPicId.length);
    const shuffledPictures = filteredForPicId.sort(() => 0.5 - Math.random());
    const selectedPictures = shuffledPictures.slice(0, numberOfPicturesToSelect);
    const pictureIds = selectedPictures.map(picture => picture.pic_id);
    
    return NextResponse.json({ pictureIds });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
