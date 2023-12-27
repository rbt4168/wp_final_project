import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
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
    const { title, origin, previewUrl} = body;

    // Assume you have a user table where you want to update this information
    // and 'userId' is obtained from the session or some other source
    const id = session?.user?.id; // Replace with actual way to get the user's ID

    console.log("----------------------------------------------");

    console.log(session?.user)
    console.log("----------------------------------------------");

    const User = await db
          .select({
            author: usersTable.name,
            uid   : usersTable.id
          })
          .from(usersTable)
          .where(eq(usersTable.displayId, id))
          .execute();
    // Update user profile in the database
    console.log("----------------------------------------------");
    console.log(User[0].author);
    console.log("----------------------------------------------");
    if (!User){
        console.log("fefefe");
        return new NextResponse("No author you bad guy", { status: 401 });
    }
    console.log("stage1 ")
    const [updoadPicture] = await db
      .insert(pictureTable)
      .values({
        name: title,
        description: origin,
        author : User[0].author,
        url: previewUrl // Ensure your database can handle this array format
      })
      .returning();

    // Return the updated user information
    return NextResponse.json({ updoadPicture });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
