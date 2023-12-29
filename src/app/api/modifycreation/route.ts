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
    const session_id = session?.user?.id; // Replace with actual way to get the user's ID

    // Extract data from request body
    const body = await request.json();
    const { pic_id, title, origin, recommand, value } = body;

    // Assume you have a user table where you want to update this information
    // and 'userId' is obtained from the session or some other source

    const User = await db
          .select({
            author: usersTable.name,
            id   : usersTable.id
          })
          .from(usersTable)
          .where(eq(usersTable.displayId, session_id))
          .execute();

    if (!User){
        // console.log("fefefe");
        return new NextResponse("No author you bad guy", { status: 401 });
    }

    const [updoadPicture]  = await db
      .update(pictureTable)
      .set({
        name: title,
        description: origin,
        recommand_point: recommand,
        tags: value,
      }).where(eq(pictureTable.pic_id, pic_id))
      .returning();
    
    if (!updoadPicture){
        return new NextResponse("No author you bad guy", { status: 401 });
    }
    return NextResponse.json({ updoadPicture });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
