import { sql } from "drizzle-orm";
import { pgTable, text, varchar, date, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Individual booking slots (1-24 slots per day)
export const bookingSlots = pgTable("booking_slots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: date("date").notNull(),
  slotNumber: integer("slot_number").notNull(), // 1-24
  isAvailable: boolean("is_available").notNull().default(true),
  bookedBy: varchar("booked_by"), // booking request ID when booked
});

// Booking requests from customers
export const bookingRequests = pgTable("booking_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  catName: text("cat_name").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  specialRequirements: text("special_requirements"),
  status: text("status").notNull().default("pending"), // pending, approved, denied
  createdAt: timestamp("created_at").notNull().defaultNow(),
  adminNotes: text("admin_notes"),
});

export const contactInquiries = pgTable("contact_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBookingSlotSchema = createInsertSchema(bookingSlots).pick({
  date: true,
  slotNumber: true,
  isAvailable: true,
});

export const insertBookingRequestSchema = createInsertSchema(bookingRequests).pick({
  customerName: true,
  customerEmail: true,
  customerPhone: true,
  catName: true,
  startDate: true,
  endDate: true,
  specialRequirements: true,
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).pick({
  name: true,
  email: true,
  phone: true,
  message: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBookingSlot = z.infer<typeof insertBookingSlotSchema>;
export type BookingSlot = typeof bookingSlots.$inferSelect;
export type InsertBookingRequest = z.infer<typeof insertBookingRequestSchema>;
export type BookingRequest = typeof bookingRequests.$inferSelect;
export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;
