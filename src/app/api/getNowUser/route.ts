import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { usersTable } from "@/db/schema"; // Import your UserTable if not already done

export async function GET(request: Request) {
  try {
    // Authentication
    const session = await auth();
    if (!session?.user?.username) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // Query
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, session?.user?.username))
      .execute();
    
    // Return the user information
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
