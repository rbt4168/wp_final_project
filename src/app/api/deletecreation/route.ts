import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
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
    const {pic_id} = body

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
    
    // Update user profile in the database
    if (!User){
        // console.log("fefefe");
        return new NextResponse("No author you bad guy", { status: 401 });
    }
    
    await db.delete(pictureTable)
    .where(eq(pictureTable.pic_id, pic_id))
    .returning();
    
    const [currentUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username,(session?.user?.username)));
    
    if (!currentUser.post_picture){
        return new NextResponse("No author you bad guy", { status: 401 });
    }
    // Check if the user has an existing post_picture array, if not, initialize it
    const currentPostPictures = currentUser.post_picture || [];
// Remove the specified pic_id from the array
    const updatedPostPictures = currentPostPictures.filter(id => id !== pic_id);
    
    // Update the user's record
    await db
      .update(usersTable)
      .set({
        post_picture: updatedPostPictures,
      })
      .where(eq(usersTable.username, session?.user?.username))
      .returning();

    // Return the updated user information
    return NextResponse.json({ pic_id });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
