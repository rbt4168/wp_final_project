import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { usersTable, pictureTable } from "@/db/schema"; // Import your UserTable if not already done
import { auth } from "@/lib/auth";
export async function POST(request: Request) {
  try {
    // Request Body
    const body = await request.json();
    const { pic_id } = body;

    // Query
    const getpicture = await db
      .select()
      .from(pictureTable)
      .where(eq(pictureTable.pic_id, pic_id))
      .execute();


    const session = await auth();

// Check if the user is not authenticated
    if (!session?.user?.email) {
        // Check if the picture has tags and if any of them are private
        const picture = getpicture;
        const hasPrivateTag = picture[0]?.tags?.some(tag => tag.startsWith('private'));

        if (hasPrivateTag) {
            // If private, return a JSON response with a cat image URL
            return new NextResponse(null, { status: 404 });
        } else {
            // If not private or no tags, return the picture data
            console.log(getpicture);
            return NextResponse.json({ picture });
        }
    }
    else{
        const [User] = await db
        .select({
            author: usersTable.name,
            id: usersTable.id,
            owned_private_tag: usersTable.owned_private_tag,
        })
        .from(usersTable)
        .where(eq(usersTable.displayId, session.user.id))
        .execute();

    // If the user does not exist
        if (!User) {
            return new NextResponse("No author you bad guy", { status: 401 });
        }

        // Fetch picture information
        const picture = getpicture; // Assuming getpicture contains the required picture data
        if (picture[0].tags === null){
            return NextResponse.json({ picture });
        }
        console.log(picture);
        // Check if user owns the private tag associated with the picture
        const userHasAccess = picture[0].tags.some(tag => 
            tag.startsWith('private') && 
            User.owned_private_tag && 
            User.owned_private_tag.includes(tag)
        );
        const hasNonPrivateTags = picture[0].tags.some(tag => 
            !tag.startsWith('private')
        );
        console.log(userHasAccess);
        console.log(hasNonPrivateTags);
        if (userHasAccess || hasNonPrivateTags) {
            // User owns the tag, return the picture
            return NextResponse.json({ picture });
        } else {
            // User does not own the tag, return an error
            return new NextResponse("No access to private picture", { status: 403 });
        }
    }
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
