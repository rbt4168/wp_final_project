import { eq } from "drizzle-orm";

import { db } from "../../db";
import { usersTable } from "../../db/schema";
import { auth } from "@/lib/auth";

const getNowUser = async () => {

  try {
    const session = await auth();
    if (!session?.user?.username) {
      return [];
    }
    const user = await db
      .select({
        id: usersTable.displayId,
        username: usersTable.username,
        email: usersTable.email,
        provider: usersTable.provider,
        name: usersTable.name,
        quote: usersTable.quote,
        title: usersTable.title,
        birthday: usersTable.birthday,
        bio: usersTable.bio,
        links: usersTable.links,
        liked_picture: usersTable.liked_picture,
        liked_user: usersTable.liked_user,
        recommand_picture: usersTable.recommand_picture,
        post_picture: usersTable.post_picture,
        private_tags: usersTable.private_tags,
        private_tags_cost: usersTable.private_tags,
        owned_private_tag: usersTable.owned_private_tag,
        coins: usersTable.coins,

      })
      .from(usersTable)
      .where(eq(usersTable.username, session?.user?.username))
      .execute();
    return user;
  } catch (error) {
    console.log("error in get user");
  }
};
export default getNowUser;
