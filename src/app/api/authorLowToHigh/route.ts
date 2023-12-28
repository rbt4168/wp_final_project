import { NextResponse } from "next/server";
import { eq, asc } from "drizzle-orm";
import { db } from "@/db";
import { pictureTable } from "@/db/schema"; // Import your UserTable if not already done

export async function POST(request: Request) {
  try {
    // Authentication
    const body = await request.json();
    const {author_id} = body;

    // Query
    const pictureLowToHigh = await db
      .select()
      .from(pictureTable)
      .where(eq(pictureTable.author_id, author_id))
      .orderBy(asc(pictureTable.pic_id))
      .execute();
    const pictureIds = pictureLowToHigh.map(picture => picture.pic_id);
    console.log("--------------==================");
    console.log("Low")
    console.log(pictureIds);
    console.log("--------------==================");
    // Return the user information
    return NextResponse.json({ pictureIds });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
