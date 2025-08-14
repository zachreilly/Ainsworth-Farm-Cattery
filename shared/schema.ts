import { sql } from "drizzle-orm";
import { pgTable, text, varchar, date, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const availability = pgTable("availability", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: date("date").notNull().unique(),
  isAvailable: boolean("is_available").notNull().default(true),
});

export const contactInquiries = pgTable("contact_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull().default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAvailabilitySchema = createInsertSchema(availability).pick({
  date: true,
  isAvailable: true,
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).pick({
  name: true,
  email: true,
  phone: true,
  message: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertAvailability = z.infer<typeof insertAvailabilitySchema>;
export type Availability = typeof availability.$inferSelect;
export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;
