import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uniqueId: text("unique_id").notNull(),
  firstName: varchar("first_name", 255).notNull(),
  lastName: varchar("last_name", 255).notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  provider: text("provider"),
});


export const MockInterview=pgTable('mockInterview',{
  id:serial('id').primaryKey(),
  jsonMockResp:text('jsonMockResp').notNull(),
  josPosition:varchar('jobPosition').notNull(),
  JobDesc:varchar('jobDesc').notNull(),
  jobExperience:varchar('jobExperience').notNull(),
  createdBy:varchar('createdBy').notNull(),
  createdAt:varchar('createdAt'),
  mockId:varchar('mockId').notNull()
})