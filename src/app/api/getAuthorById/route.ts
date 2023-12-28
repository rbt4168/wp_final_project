import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { usersTable } from "@/db/schema"; // Import your UserTable if not already done

export async function GET(request: Request) {
  try {
    // Request Body
    const { searchParams } = new URL(request.url)
    const user_id = parseInt(searchParams.get('user_id') || "");

    // Query
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, user_id))
      .execute();
    
    const select_user = user[0];
    
    // Return the user information
    return NextResponse.json({
      account: select_user?.username,
      name: select_user?.name, 
      quote: select_user?.quote, 
      bio: select_user?.bio, 
      links: select_user?.links,
      works: select_user?.post_picture,
      tags: select_user?.private_tags,
      costs: select_user?.private_tags_cost
    });

  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
