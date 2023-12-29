import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { pictureTable } from "@/db/schema"; // Import your UserTable if not already done

export async function POST(request: Request) {
  try {
    // Request Body
    const body = await request.json();
    const { pic_id } = body;

    // Query
    const picture = await db
      .select()
      .from(pictureTable)
      .where(eq(pictureTable.pic_id, pic_id))
      .execute();
    
    
    // Return the picture information
    return NextResponse.json({ picture });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
