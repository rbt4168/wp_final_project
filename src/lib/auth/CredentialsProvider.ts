import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { eq ,and, or} from "drizzle-orm";

import { db } from "@/db";
import { transactionTable, usersTable } from "@/db/schema";
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

    if(username) {
      // register
      const [checkDup] = await db
        .select()
        .from(usersTable)
        .where(or(
          eq(usersTable.email, email.toLowerCase()), 
          eq(usersTable.username, username)
        )).execute();

      if(checkDup) {
        console.log("Email or Username duplicated.");
        return null;
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);

      const [createdUser] = await db
        .insert(usersTable)
        .values({
          email: email.toLowerCase(),
          hashedPassword,
          provider: "credentials",
          username: username,
          name: username,
          quote: "安安~~",
          coins: 100
        }).returning();

      await db
        .insert(transactionTable)
        .values({
          to_user: username,
          from_user: "system",
          amount: 100,
          timestamp: Date.now().toString()
        }).returning()
        
      return {
        email: createdUser.email,
        id: createdUser.id.toString(),
        name: createdUser.username,
        provider: "credentials"
      };
    } else {
      //login
      const [credentialUser] = await db
        .select()
        .from(usersTable)
        .where(and(
          eq(usersTable.email, email.toLowerCase()), 
          eq(usersTable.provider, 'credentials')
        )).execute();

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
          id: credentialUser.id.toString(),
          name: credentialUser.username,
          provider: "credentials"
        };
      }
    }
    return null;
  },
  
});