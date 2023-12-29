import { NextResponse } from "next/server";
import { eq, and, like } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { pictureTable, usersTable } from "@/db/schema"; // Import your UserTable if not already done
import { Kurale } from "next/font/google";

export async function POST(request: Request) {
  try {
    // Authentication
    

    // Extract data from request body
    const body = await request.json();
    const { keyword} = body;

    // Assume you have a user table where you want to update this information
    // and 'userId' is obtained from the session or some other source

    

    

    console.log("stage1 ")



    console.log(keyword);
    const targetPictures = await db
      .select({ picture_id: pictureTable.pic_id })
      .from(pictureTable)
      .where(like(pictureTable.name, `%${keyword}%`))
      .execute();

    console.log(targetPictures);

    // Check if targetPictures is an array and extract picture_ids
    const targetPictureIds = Array.isArray(targetPictures)
      ? targetPictures.map(picture => picture.picture_id)
      : [];

    console.log("=================================");
    console.log(targetPictureIds);
    console.log("=================================");

    // Return the updated user information
    return NextResponse.json({ targetPictureIds});
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
