import { NextResponse } from "next/server";
import { eq, desc, inArray } from "drizzle-orm";
import { db } from "@/db";
import { pictureTable, usersTable } from "@/db/schema"; // Import your UserTable if not already done
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // Authentication
    const body = await request.json();
    const {author_id} = body;
    // Query
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extract data from request body
   

    // Assume you have a user table where you want to update this information
    // and 'userId' is obtained from the session or some other source
    const session_id = session?.user?.id; // Replace with actual way to get the user's ID

    const [User] = await db
          .select({
            author: usersTable.name,
            id   : usersTable.id,
            owned_private_tag : usersTable.owned_private_tag,
          })
          .from(usersTable)
          .where(eq(usersTable.displayId, session_id))
          .execute();
    // Update user profile in the database
    if (!User){
        // console.log("fefefe");
        return new NextResponse("No author you bad guy", { status: 401 });
    }
    

    const pictures = await db
      .select({
        pic_id: pictureTable.pic_id,
        tags: pictureTable.tags
      
      })
      .from(pictureTable)
      .where(eq(pictureTable.pic_id, author_id))
      .orderBy(desc(pictureTable.pic_id))
      .execute();
      if (!User.owned_private_tag || User.owned_private_tag.length === 0) {
        return NextResponse.json("No picture", { status: 404 });
      }
    
    // Return the user information
    const matchedPictureIDs = pictures.filter(picture =>
      picture.tags && picture.tags.some(tag => User.owned_private_tag && User.owned_private_tag.includes(tag))
    ).map(picture => picture.pic_id);
    
    console.log("match");
    console.log(matchedPictureIDs);
    console.log("match");
    return NextResponse.json({ matchedPictureIDs });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
