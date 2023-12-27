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

    // Assume you have a user table where you want to update this information
    // and 'userId' is obtained from the session or some other source
    const username = session.user.username; // Replace with actual way to get the user's ID

    console.log("----------------------------------------------");
    console.log(name);
    console.log(quote);
    console.log(title);
    console.log(bio);
    console.log(links);
    console.log("----------------------------------------------");

    // Update user profile in the database
    const [updatedUser] = await db
      .update(usersTable)
      .set({
        name: name,
        quote: quote,
        title: title,
        bio: bio,
        links: links // Ensure your database can handle this array format
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
