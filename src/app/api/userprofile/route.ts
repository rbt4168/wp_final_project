import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { usersTable } from "@/db/schema"; // Import your UserTable if not already done

export async function POST(request: Request) {
  try {
    // Authentication
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extract data from request body
    const body = await request.json();
    const { name, quote, title, bio, links } = body;
    const username = session.user.username; 

    const [updatedUser] = await db
      .update(usersTable)
      .set({
        name: name,
        quote: quote,
        title: title,
        bio: bio,
        links: links // String, seperate by ','
      })
      .where(eq(usersTable.username, username)) // Assuming 'id' is the user identifier in your table
      .returning();
    // Return the updated user information
    return NextResponse.json({ updatedUser });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
