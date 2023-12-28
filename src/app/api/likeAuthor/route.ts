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
    const { author_id, like } = body;

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
    
    const [currentUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username,(session?.user?.username)));
    
    if (like && currentUser.liked_user?.includes(parseInt(author_id))) {
      return new NextResponse("Duplicated like", { status: 400 });
    } else if (!like && !currentUser.liked_user?.includes(parseInt(author_id))) {
      return new NextResponse("Not Existed like", { status: 400 });
    }

    const currentLikedUser = currentUser.liked_user || [];
    let updatedLikedUser = []
    if(like) {
      updatedLikedUser = [...currentLikedUser, parseInt(author_id)];
    } else {
      updatedLikedUser = currentLikedUser.filter(id => id !== parseInt(author_id));
    }
    
    // Update the user's record
    const [updatedUser] = await db
      .update(usersTable)
      .set({
        liked_user: updatedLikedUser,
      })
      .where(eq(usersTable.username, session?.user?.username))
      .returning();
      
    console.log("Update User.");

    // Return the updated user information
    return NextResponse.json({ updatedUser });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
