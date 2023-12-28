import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { pictureTable, usersTable } from "@/db/schema"; // Import your UserTable if not already done

export async function POST(request: Request) {
  try {
    // Authentication
    const session = await auth();
    if (!session?.user?.username) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const user = await db
      .select({
        id: usersTable.displayId,
        username: usersTable.username,
        email: usersTable.email,
        provider: usersTable.provider,
        name: usersTable.name,
        quote: usersTable.quote,
        title: usersTable.title,
        birthday: usersTable.birthday,
        bio: usersTable.bio,
        links: usersTable.links,
        liked_picture: usersTable.liked_picture,
        liked_user: usersTable.liked_user,
        recommand_picture: usersTable.recommand_picture,
        post_picture: usersTable.post_picture,
        private_tags: usersTable.private_tags,
        private_tags_cost: usersTable.private_tags,
        owned_private_tag: usersTable.owned_private_tag,
        coins: usersTable.coins,

      })
      .from(usersTable)
      .where(eq(usersTable.username, session?.user?.username))
      .execute();
    // Return the updated user information
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
