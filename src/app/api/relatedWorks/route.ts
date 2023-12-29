import { NextResponse } from "next/server";
import { db } from "@/db";
import { pictureTable } from "@/db/schema"; // Import your UserTable if not already done

export async function GET(request: Request) {
  try {
    // Authentication
    

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
    const filteredForPrivate = allPicture.filter(picture => 
      picture.tags && !picture.tags.some(tag => tag.startsWith('private')));
    const numberOfPicturesToSelect = Math.min(5, filteredForPrivate.length);

    const shuffledPictures = filteredForPrivate.sort(() => 0.5 - Math.random());
    const selectedPictures = shuffledPictures.slice(0, numberOfPicturesToSelect);

    const pictureIds = selectedPictures.map(picture => picture.pic_id);
    console.log(pictureIds);
    return NextResponse.json({ pictureIds });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
