import { timestamp } from "drizzle-orm/cockroach-core";
import { integer, pgTable, varchar, uuid, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  firstname: varchar('first_name',{ length: 60 }).notNull(),
  lastname: varchar('last_name',{ length: 60 }),
  email: varchar({ length: 255 }).notNull().unique(),
  
  password: text().notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').$onUpdate(()=> new Date()),
});
