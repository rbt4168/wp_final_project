import { index, text, pgTable, serial, uuid, varchar,integer } from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: text("username").unique(),
    email: varchar("email", { length: 100 }).notNull(),
    hashedPassword: varchar("hashed_password", { length: 100 }),
    provider: varchar("provider", {
      length: 100,
    }).notNull().default("credentials"),
    name: text("name"),
    quote: text("quote"),
    title: text("title"),
    birthday: text("birthday"),
    bio: text("bio"),
    links: text("links"),
    liked_picture: integer("like_picture").array(),
    liked_user: integer("liked_user").array(),
    post_picture: integer("post_picture").array(),
    private_tags: text("private_tags").array(),
    private_tags_cost: integer("private_tags_cost").array(),
    owned_private_tag: text("owned_private_tag").array(),
    coins: integer("coins"),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    emailIndex: index("email_index").on(table.email),
  }),
);
export const pictureTable = pgTable(
  "picture",
  {
    pic_id: serial("pic_id").primaryKey(),
    url: text("url"),
    origin_url: text("origin_url"),
    author_id: integer("author"),
    name: text("name"),
    description: text("description"),
    post_date: text("post_date"),
    liked_count: integer("liked_count"),
    recommand_point: integer("recommand_point"),
    tags: text("tags").array(),
    message: text("message"),
  },
);
export const transactionTable = pgTable(
  "transaction",
  {
      tx_id: serial("tx_id").primaryKey(),
      from_user: text("from_user"),
      to_user: text("to_user"),
      amount: integer("amount"),
      timestamp: text("timestamp")
  }
)

// Remaining code for relations and other tables remains unchanged
