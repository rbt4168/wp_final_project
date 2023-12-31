import { NextResponse } from "next/server";
import { db } from "@/db";
import { pictureTable } from "@/db/schema";

import { like, desc } from "drizzle-orm";

interface Tag {
  tagname: string;
  positive: boolean;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { target, tags }: { target: string; tags: Tag[] } = body;

    const targetPictures = await db
      .select({ 
        picture_id: pictureTable.pic_id,
        tags : pictureTable.tags,  
      })
      .from(pictureTable)
      .where(like(pictureTable.name, `%${target}%`))
      .orderBy(desc(pictureTable.pic_id))
      .execute();
    
    const filteredForPrivate = targetPictures.filter(picture => 
      picture.tags && !picture.tags.some(tag => tag.startsWith('private'))
    );

    let finalFilteredPictures = [];

    if (tags && tags.length > 0) {
      const positiveTags = tags.filter(tag => tag.positive).map(tag => tag.tagname);
      const negativeTags = tags.filter(tag => !tag.positive).map(tag => tag.tagname);

      finalFilteredPictures = filteredForPrivate.filter(picture => {
        const pictureTags = picture.tags || [];
        const hasNegativeTag = negativeTags.some(negativeTag => pictureTags.includes(negativeTag));
        if (hasNegativeTag) return false;
        return positiveTags.every(positiveTag => pictureTags.includes(positiveTag));
      });
    } else {
      finalFilteredPictures = filteredForPrivate;
    }

    const targetPictureIDs = finalFilteredPictures.map(picture => picture.picture_id);

    return NextResponse.json({ tids: targetPictureIDs });
  } catch (error) {
    console.error("/api/search :", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
