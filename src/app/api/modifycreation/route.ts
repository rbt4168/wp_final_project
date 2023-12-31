import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable, pictureTable } from "@/db/schema";

import { and, eq } from "drizzle-orm";

import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pic_id, title, origin, recommand, value } = body;

    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const session_id = session?.user?.id;

    const [User] = await db
          .select({id: usersTable.id})
          .from(usersTable)
          .where(eq(usersTable.displayId, session_id))
          .execute();
    
    if (!User){
        return new NextResponse("No author you bad guy", { status: 401 });
    }

    const [uploadPicture]  = await db
      .update(pictureTable)
      .set({
        name: title,
        description: origin,
        recommand_point: recommand,
        tags: value,
      }).where(and(
        eq(pictureTable.author_id, User.id),
        eq(pictureTable.pic_id, pic_id)
      )).returning();
    
    if (!uploadPicture){
        return new NextResponse("No author you bad guy", { status: 401 });
    }

    return NextResponse.json({ uploadPicture });
  } catch (error) {
    console.error("/api/modifycreation :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
