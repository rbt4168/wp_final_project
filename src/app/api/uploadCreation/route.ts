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
    const { title, origin, previewUrl, recommand, value } = body;

    // Assume you have a user table where you want to update this information
    // and 'userId' is obtained from the session or some other source
    const session_id = session?.user?.id; // Replace with actual way to get the user's ID

    console.log("----------------------------------------------");
    console.log(session?.user)
    console.log("----------------------------------------------");

    const User = await db
          .select({
            author: usersTable.name,
            id   : usersTable.id
          })
          .from(usersTable)
          .where(eq(usersTable.displayId, session_id))
          .execute();
    
    // Update user profile in the database
    console.log("----------------------------------------------");
    console.log("value")
    console.log(value);
    console.log("----------------------------------------------");

    if (!User){
        // console.log("fefefe");
        return new NextResponse("No author you bad guy", { status: 401 });
    }

    console.log("stage1 ")
    const currentDate = new Date(); 

    const [ updoadPicture ] = await db
      .insert(pictureTable)
      .values({
        name: title,
        description: origin,
        author_id : User[0].id,
        url: previewUrl, // Ensure your database can handle this array format
        post_date: String(currentDate), // 加入現在的時間
        liked_count: Number(0),
        recommand_point: recommand,
        tags: value,
      })
      .returning();

    // Return the updated user information
    return NextResponse.json({ updoadPicture });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
