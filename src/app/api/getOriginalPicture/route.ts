import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable, pictureTable } from "@/db/schema";

import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pic_id } = body;

    const session = await auth();

    const picture = await db
      .select()
      .from(pictureTable)
      .where(eq(pictureTable.pic_id, pic_id))
      .execute();

    if (picture && picture[0] && !session?.user?.email) {
      const hasPrivateTag = picture[0]?.tags?.some(
          tag => tag.startsWith('private')
      );

      if (hasPrivateTag) {
          return new NextResponse(null, { status: 404 });
      } else {
          return NextResponse.json({ picture });
      }
    } else {
      const [User] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.displayId, session?.user?.id))
        .execute();

      if (!User) {
          return new NextResponse("No author you bad guy", { status: 401 });
      }

      if (picture[0].tags === null){
          return NextResponse.json({ picture });
      }
      
      const userHasAccess = picture[0].tags.some(tag => 
        tag.startsWith('private') && 
        User.owned_private_tag &&
        User.owned_private_tag.includes(tag)
      );

      const hasNonPrivateTags = picture[0].tags.some(tag => 
        !tag.startsWith('private')
      );

      if (userHasAccess || hasNonPrivateTags) {
          return NextResponse.json({ picture });
      } else {
          return new NextResponse("No access to private picture", { status: 403 });
      }
    }
  } catch (error) {
    console.error("/api/getOriginalPicture :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
