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
        pic_id : pictureTable.pic_id,
        tags   : pictureTable.tags
      })
      .from(pictureTable)
      .orderBy(desc(pictureTable.liked_count))
      .limit(5)
      .execute();
    //console.log(hotpicture);
    // Return the user information
    const filteredForPrivate = hotpicture.filter(picture => 
      picture.tags && !picture.tags.some(tag => tag.startsWith('private')));
    const pictureIds = filteredForPrivate.map(picture => picture.pic_id);
    
    return NextResponse.json({ pictureIds });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
