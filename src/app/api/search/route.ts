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
    const {keyword, tags} = body;

    // Assume you have a user table where you want to update this information
    // and 'userId' is obtained from the session or some other source

    

    

    console.log("stage1 ")



    console.log(keyword);
    const targetPictures = await db
      .select({ 
        picture_id: pictureTable.pic_id,
        tags : pictureTable.tags,  
      })
      .from(pictureTable)
      .where(like(pictureTable.name, `%${keyword}%`))
      .execute();

    console.log(targetPictures);

    // Check if targetPictures is an array and extract picture_ids
    

    // Return the updated user information
    
    if (tags && tags.length > 0) {
      console.log("tags is: ");
      console.log(tags);
      const positiveTags = tags.filter((tag : any) => tag.positive).map((tag :any) => tag.tagname);
      const negativeTags = tags.filter((tag : any) => !tag.positive).map((tag : any) => tag.tagname);

      // Filter pictures
      const filteredPictures = targetPictures.filter(picture => {
        const pictureTags = picture.tags || []; // Assuming tags are an array of strings
        // Check for negative tags
        const hasNegativeTag = negativeTags.some((negativeTag : any) => pictureTags.includes(negativeTag));
        if (hasNegativeTag) return false;
        // Check for positive tags
        return positiveTags.every((positiveTag : any)=> pictureTags.includes(positiveTag));
      });

      // Extract picture_ids and tags from filtered pictures
      const targetPictureDetails = filteredPictures.map(picture => {
        return { id: picture.picture_id, tags: picture.tags };
      });

      // Return the picture details
      return NextResponse.json({ targetPictureDetails });
      }
      else{
        const targetPictureIds = Array.isArray(targetPictures)
        ? targetPictures.map(picture => picture.picture_id)
        : [];
    
        console.log("=================================");
        console.log(targetPictureIds);
        console.log("=================================");
        console.log("tags is null")
        return NextResponse.json({ targetPictureIds});
      }
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
