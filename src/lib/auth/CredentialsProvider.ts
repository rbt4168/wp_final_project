import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { eq ,and} from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { authSchema } from "@/validators/auth";

export default CredentialsProvider({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    username: { label: "Userame", type: "text"},

    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    let validatedCredentials: {
      email: string;
      username?: string;
      password: string;
    };
  
    try {
      validatedCredentials = authSchema.parse(credentials);
    } catch (error) {
      console.log("Invalid credentials format.");
      return null;
    }
  
    const { email, password, username } = validatedCredentials;
    console.log("efeqfeqwfwqfqewfqwefeqwfqeefqewfweqfqwfe2")

    console.log(username)
    console.log("efeqfeqwfwqfqewfqwefeqwfqeefqewfweqfqwfe2")

    // Check for user with same email and 'credentials' provider
    const [credentialUser] = await db
      .select({
        id: usersTable.displayId,
        email: usersTable.email,
        provider: usersTable.provider,
        hashedPassword: usersTable.hashedPassword,
        username : usersTable.username,
      })
      .from(usersTable)
      .where(and(eq(usersTable.email, email.toLowerCase()), eq(usersTable.provider, 'credentials')))
      .execute();
  
    if (credentialUser) {
      // Existing credentials user, proceed with sign-in
      if (!credentialUser.hashedPassword){
        console.log("this is a bug");
        return null;
      }
      const isValid = await bcrypt.compare(password, credentialUser.hashedPassword);
      if (!isValid) {
        console.log("Incorrect password.");
        return null;
      }
      return {
        email: credentialUser.email,
        id: credentialUser.id,
        name: credentialUser.username,
        provider: "credentials"
      };
    } else {
      // No credentials user found, create a new one

  
      const hashedPassword = await bcrypt.hash(password, 10);
      const [createdUser] = await db
        .insert(usersTable)
        .values({
          email: email.toLowerCase(),
          hashedPassword,
          provider: "credentials",
          username: username,
        })
        .returning();
  
      return {
        email: createdUser.email,
        id: createdUser.displayId,
        name: createdUser.username,
        provider: "credentials"
      };
    }
  },
  
});