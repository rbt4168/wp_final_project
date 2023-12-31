import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable, transactionTable } from "@/db/schema";

import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { authorname, tagname } = body;

    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const session_id = session?.user?.id;

    const [User] = await db
          .select({
            username: usersTable.username,
            coins: usersTable.coins,
            owned_private_tag: usersTable.owned_private_tag
          })
          .from(usersTable)
          .where(eq(usersTable.displayId, session_id))
          .execute();
    
    if (!User) {
        return new NextResponse("No author you bad guy", { status: 401 });
    }

    const [Author] = await db
          .select({
            username: usersTable.username,
            private_tags: usersTable.private_tags,
            private_tags_cost: usersTable.private_tags_cost,

          })
          .from(usersTable)
          .where(eq(usersTable.username, authorname))
          .execute();

    if (!Author) {
      return new NextResponse("Author Not Exist", { status: 400 });
    }

    const usercoin = User.coins || 0;
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

    const currentOwnedTag = User.owned_private_tag || [];
    
    const updatedOwnedTag = [...currentOwnedTag, "private-"+authorname+"-"+tagname];

    await db
      .update(usersTable)
      .set({
        coins: usercoin - tagcost,
        owned_private_tag: updatedOwnedTag,
      })
      .where(eq(usersTable.username, session?.user?.username))
      .returning();
    
    const [Author2] = await db
      .select({
        coins: usersTable.coins,
      })
      .from(usersTable)
      .where(eq(usersTable.username, authorname))
      .execute();

    await db
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

    return NextResponse.json({ newTx });
  } catch (error) {
    console.error("/api/buyTag", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
