import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable, pictureTable } from "@/db/schema";

import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";

import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, origin, previewUrl, recommand, value } = body;

    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const session_id = session?.user?.id;

    const [User] = await db
          .select({
            id: usersTable.id,
            post_picture: usersTable.post_picture,
          })
          .from(usersTable)
          .where(eq(usersTable.displayId, session_id))
          .execute();
    
    if (!User){
        return new NextResponse("No author you bad guy", { status: 401 });
    }

    const currentDate = new Date(); 
    const padWithZero = (number : any) => number < 10 ? `0${number}` : number;

    const DateFomate = `${currentDate.getFullYear()}-${padWithZero(currentDate.getMonth() + 1)}-${padWithZero(currentDate.getDate())}`;

    const res = await axios.post(
      process.env.PICTURE_SERVER_URL+"upload", {img: previewUrl}
    );

    const [ uploadPicture ] = await db
      .insert(pictureTable)
      .values({
        name: title,
        description: origin,
        author_id : User.id,
        url: res.data.compress,
        origin_url: res.data.original,
        post_date: DateFomate, // 加入現在的時間
        liked_count: Number(0),
        recommand_point: recommand,
        tags: value,
      }).returning();
    
    const currentPostPictures = User.post_picture || [];

    const updatedPostPictures = [...currentPostPictures, uploadPicture.pic_id];

    const [updatedUser] = await db
      .update(usersTable)
      .set({
        post_picture: updatedPostPictures,
        title: title,
      })
      .where(eq(usersTable.username, session?.user?.username))
      .returning();
    
    return NextResponse.json({ uploadPicture, updatedUser });
  } catch (error) {
    console.error("/api/uploadCreation :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
