import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { pictureTable, usersTable } from "@/db/schema"; // Import your UserTable if not already done
import axios from "axios";

export async function POST(request: Request) {
  try {
    // Authentication
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extract data from request body
    const body = await request.json();
    const { title, origin, previewUrl, recommand, value } = body;

    // Assume you have a user table where you want to update this information
    // and 'userId' is obtained from the session or some other source
    const session_id = session?.user?.id; // Replace with actual way to get the user's ID

    console.log("----------------------------------------------");
    console.log(session?.user)
    console.log("----------------------------------------------");

    const User = await db
          .select({
            author: usersTable.name,
            id   : usersTable.id
          })
          .from(usersTable)
          .where(eq(usersTable.displayId, session_id))
          .execute();
    
    // Update user profile in the database
    console.log("----------------------------------------------");
    console.log("value")
    console.log(value);
    console.log("----------------------------------------------");

    if (!User){
        // console.log("fefefe");
        return new NextResponse("No author you bad guy", { status: 401 });
    }

    console.log("stage1 ")
    const currentDate = new Date(); 
    const padWithZero = (number : any) => number < 10 ? `0${number}` : number;

    const DateFomate = `${currentDate.getFullYear()}-${padWithZero(currentDate.getMonth() + 1)}-${padWithZero(currentDate.getDate())}`;

    let res = await axios.post(process.env.PICTURE_SERVER_URL+"upload", {img: previewUrl})
    console.log(res.data.original, res.data.compress);

    const [ updoadPicture ] = await db
      .insert(pictureTable)
      .values({
        name: title,
        description: origin,
        author_id : User[0].id,
        url: res.data.compress, // Ensure your database can handle this array format
        origin_url: res.data.original,
        post_date: DateFomate, // 加入現在的時間
        liked_count: Number(0),
        recommand_point: recommand,
        tags: value,
      }).returning();

    const [currentUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username,(session?.user?.username)));
    
    // Check if the user has an existing post_picture array, if not, initialize it
    const currentPostPictures = currentUser.post_picture || [];
    
    // Append the new pic_id to the array
    const updatedPostPictures = [...currentPostPictures, updoadPicture.pic_id];
    
    // Update the user's record
    const [updatedUser] = await db
      .update(usersTable)
      .set({
        post_picture: updatedPostPictures,
        title: title,
      })
      .where(eq(usersTable.username, session?.user?.username))
      .returning();

    // Return the updated user information
    return NextResponse.json({ updoadPicture, updatedUser });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
