import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { pictureTable } from "@/db/schema"; // Import your UserTable if not already done

export async function POST(request: Request) {
  try {
    // Authentication
   
    const body = await request.json();
    const {pic_id} = body;
    // Query
    const picture = await db
      .select()
      .from(pictureTable)
      .where(eq(pictureTable.pic_id, pic_id))
      .execute();

    
    // Return the updated user information
    return NextResponse.json({ picture });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
