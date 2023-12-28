import { NextResponse } from "next/server";
import { eq, desc, inArray} from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { pictureTable, usersTable } from "@/db/schema"; // Import your UserTable if not already done

export async function GET(request: Request) {
  try {
    // Authentication
    const session = await auth();
    if (!session?.user?.username) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, session.user?.username))
    // Query
    const likedUserIds = user.liked_user || [-1]; // Ensure this is always an array

    const followedLatestPicture = await db
      .select()
      .from(pictureTable)
      .where(inArray(pictureTable.author_id, likedUserIds))
      .orderBy(desc(pictureTable.pic_id))
      .limit(5)
      .execute();
    console.log("111111111111111111222222222222");
    console.log(followedLatestPicture);
    console.log("111111111111111111222222222222");

    // Return the user information
    return NextResponse.json({ followedLatestPicture });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
