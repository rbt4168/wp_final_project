import { NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { pictureTable } from "@/db/schema"; // Import your UserTable if not already done

export async function GET(request: Request) {
  try {
    // Authentication
    const session = await auth();
    if (!session?.user?.username) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // Query
    const hotpicture = await db
      .select()
      .from(pictureTable)
      .orderBy(desc(pictureTable.liked_count))
      .limit(5)
      .execute();
    //console.log(hotpicture);
    // Return the user information
    return NextResponse.json({ hotpicture });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
