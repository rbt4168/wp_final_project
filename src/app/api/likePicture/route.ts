import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { pictureTable, usersTable } from "@/db/schema"; // Import your UserTable if not already done

export async function POST(request: Request) {
  try {
    // Authentication
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extract data from request body
    const body = await request.json();
    const { pic_id, like } = body;

    // Assume you have a user table where you want to update this information
    // and 'userId' is obtained from the session or some other source
    const session_id = session?.user?.id; // Replace with actual way to get the user's ID

    const User = await db
          .select({
            author: usersTable.name,
            id   : usersTable.id
          })
          .from(usersTable)
          .where(eq(usersTable.displayId, session_id))
          .execute();
    if (!User){
        return new NextResponse("No author you bad guy", { status: 401 });
    }

    console.log("Authentication Pass.");
    

    const [currentPicture] = await db
      .select()
      .from(pictureTable)
      .where(eq(pictureTable.pic_id, parseInt(pic_id)));
    
    const [currentUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username,(session?.user?.username)));
    
    if (like && currentUser.liked_picture?.includes(parseInt(pic_id))) {
      return new NextResponse("Duplicated like", { status: 400 });
    } else if (!like && !currentUser.liked_picture?.includes(parseInt(pic_id))) {
      return new NextResponse("Not Existed like", { status: 400 });
    }

    let new_like_cnt;
    const currentLikedPictures = currentUser.liked_picture || [];
    let updatedLikedPictures = [];
    if(like) {
      new_like_cnt = (currentPicture.liked_count || 0) + 1;
      updatedLikedPictures = [...currentLikedPictures, parseInt(pic_id)];
    } else {
      new_like_cnt = (currentPicture.liked_count || 0) - 1;
      updatedLikedPictures = currentLikedPictures.filter(id => id !== parseInt(pic_id));
    }
    
    const [updatedPicture] = await db
      .update(pictureTable)
      .set({
        liked_count: new_like_cnt,
      })
      .where(eq(pictureTable.pic_id, parseInt(pic_id)))
      .returning();
      
    console.log("Update Picture.");
    
    // Update the user's record
    const [updatedUser] = await db
      .update(usersTable)
      .set({
        liked_picture: updatedLikedPictures,
      })
      .where(eq(usersTable.username, session?.user?.username))
      .returning();
      
    console.log("Update User.");

    // Return the updated user information
    return NextResponse.json({ updatedUser, updatedPicture });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
