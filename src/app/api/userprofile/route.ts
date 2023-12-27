import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    console.log("asdfsa");

    const session = await auth();
    
    console.log("``````````````````````````")

    console.log(session)
    console.log("``````````````````````````")

    const body = await request.json();
    const { announcement, roomId } = body;
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    console.log("asdfsa");
    /*
    const [updateConversation] = await db
      .update(RoomTable)
      .set({
        anno: announcement,
      })
      .where(eq(RoomTable.id, roomId))
      .returning();
    console.log("announcement_update_id", roomId);
    */

    return NextResponse.json(announcement);
  } catch (error) {
    console.log(error, "Error_Messages");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
