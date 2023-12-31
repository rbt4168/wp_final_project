import { NextResponse } from "next/server";
import { db } from "@/db";
import { pictureTable } from "@/db/schema";

import { eq } from "drizzle-orm";

// WARNING : DEPRECATED API

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pic_id } = body;

    const picture = await db
      .select()
      .from(pictureTable)
      .where(eq(pictureTable.pic_id, pic_id))
      .execute();

    if(!picture) {
      return new NextResponse("Internal Error", { status: 404 });
    }
    
    return NextResponse.json({ picture });
  } catch (error) {
    console.error("/api/getPicture :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
