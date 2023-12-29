import { NextResponse } from "next/server";
import { eq, and, like, desc } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { pictureTable, usersTable } from "@/db/schema"; // Import your UserTable if not already done
import { Kurale } from "next/font/google";
interface Tag {
  tagname: string;
  positive: boolean;
}

export async function POST(request: Request) {
  try {

    const body = await request.json();
    const { target, tags }: { target: string; tags: Tag[] } = body;

    // Assume you have a user table where you want to update this information
    // and 'userId' is obtained from the session or some other source
    const targetPictures = await db
      .select({ 
        picture_id: pictureTable.pic_id,
        tags : pictureTable.tags,  
      })
      .from(pictureTable)
      .where(like(pictureTable.name, `%${target}%`))
      .orderBy(desc(pictureTable.pic_id))
      .execute();

    // Check if targetPictures is an array and extract picture_ids
    
    const filteredForPrivate = targetPictures.filter(picture => 
      picture.tags && !picture.tags.some(tag => tag.startsWith('private')));

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

    // 提取最終過濾後的圖片ID
    const targetPictureIDs = finalFilteredPictures.map(picture => picture.picture_id);
    console.log(targetPictureIDs);
    // 返回結果
    return NextResponse.json({ tids: targetPictureIDs });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
