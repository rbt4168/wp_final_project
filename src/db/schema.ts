import { relations } from "drizzle-orm";
import {
  index,
  text,
  pgTable,
  serial,
  uuid,
  varchar,
  unique,
  PgArray,
  integer,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", {
      length: 100,
    }).unique(),
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
    recommand_picture: integer("recommand_picture").array(),
    post_picture: integer("post_picture").array(),
    private_tags: integer("private_tags").array(),
    private_tags_cost: integer("private_tags_cost").array(),
    owned_private_tag: integer("owned_private_tag").array(),
    coins: integer("coins").array(),

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
    author: integer("author"),
    name: text("name"),
    description: text("description"),
    post_date: text("post_date"),
    liked_count: integer("liked_count"),
    recommand_point: integer("recommand_point"),
    tags:  integer("tags").array(),
    message: text("message"),
  },
);
// Remaining code for relations and other tables remains unchanged
