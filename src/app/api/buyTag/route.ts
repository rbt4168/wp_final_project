import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { transactionTable, usersTable } from "@/db/schema"; // Import your UserTable if not already done

export async function POST(request: Request) {
  try {
    // Authentication
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extract data from request body
    const body = await request.json();
    const { authorname, tagname } = body;
    
    // Assume you have a user table where you want to update this information
    // and 'userId' is obtained from the session or some other source
    const session_id = session?.user?.id; // Replace with actual way to get the user's ID

    const [User] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.displayId, session_id))
          .execute();
    
    // Update user profile in the database
    if (!User) {
        return new NextResponse("No author you bad guy", { status: 401 });
    }

    const [Author] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.username, authorname))
          .execute();

    // Update user profile in the database
    if (!Author) {
      return new NextResponse("Author Not Exist", { status: 400 });
    }

    let usercoin = User.coins || 0;
    let tagcost = -1;
    
    if(Author.private_tags && Author.private_tags_cost) {
      for (let index = 0; index < Author.private_tags.length; index++) {
        if(Author.private_tags[index] === tagname) {
          tagcost = Author.private_tags_cost[index];
          break;
        }
      }
    }

    if(tagcost === -1) {
      return new NextResponse("Tag Not Exist", { status: 400 });
    }

    if(usercoin < tagcost) {
      return new NextResponse("Not Enough Coins", { status: 400 });
    }

   // Check if the user has an existing post_picture array, if not, initialize it
   const currentOwnedTag = User.owned_private_tag || [];
    
   // Append the new pic_id to the array
   const updatedOwnedTag = [...currentOwnedTag, "private-"+authorname+"-"+tagname];

    // Update the user's record
    const [updatedUser] = await db
      .update(usersTable)
      .set({
        coins: usercoin - tagcost,
        owned_private_tag: updatedOwnedTag,
      })
      .where(eq(usersTable.username, session?.user?.username))
      .returning();
    
    const [Author2] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, authorname))
      .execute();

    const [updatedAuthor] = await db
      .update(usersTable)
      .set({
        coins: (Author2.coins || 0) + tagcost,
      })
      .where(eq(usersTable.username, authorname))
      .returning();

    const [ newTx ] = await db
      .insert(transactionTable)
      .values({
        to_user: Author.username,
        from_user: User.username,
        amount: tagcost,
        timestamp: Date.now().toString()
      }).returning()

    // Return the updated user information
    return NextResponse.json({ newTx });
  } catch (error) {
    console.error("Error in POST function: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
