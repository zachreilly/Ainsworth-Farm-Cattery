import { z } from "zod";

export const insertContactInquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(1, "Please enter a message"),
});

export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
