import { NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { usersTable,pictureTable} from "@/db/schema"; // Import your UserTable if not already done

export async function POST(request: Request) {
  try {
    // Authentication
    const body = await request.json();
    const {author_id} = body;
    // Query
    const [author] = await db.select({
      authorname: usersTable.username
    })
    .from(usersTable)
    .where(eq(usersTable.id, author_id));
    if (!author){
      return new NextResponse("Internal Error", { status: 500 });
    }
    const prefix = `private-${author.authorname}`;

    const pictureHighToLow = await db
      .select()
      .from(pictureTable)
      .where(eq(pictureTable.author_id, author_id))
      .orderBy(desc(pictureTable.pic_id))
      .execute();
      
 
    const pictureIds = pictureHighToLow.filter(picture =>
      picture.tags && !picture.tags.some(tag => tag.startsWith(prefix))
     ).map(picture => picture.pic_id);
     /*
     console.log("High to Low");
     console.log(pictureIds);*/
    // Return the user information
    return NextResponse.json({ pictureIds });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
