import { 
  type User, 
  type InsertUser, 
  type BookingSlot, 
  type InsertBookingSlot, 
  type BookingRequest, 
  type InsertBookingRequest, 
  type ContactInquiry, 
  type InsertContactInquiry,
  bookingSlots,
  bookingRequests,
  contactInquiries,
  users
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getBookingSlotsForMonth(year: number, month: number): Promise<BookingSlot[]>;
  getBookingSlotsForYear(year: number): Promise<BookingSlot[]>;
  createBookingSlot(slot: InsertBookingSlot): Promise<BookingSlot>;
  initializeBookingSlotsForYear(year: number): Promise<void>;
  
  createBookingRequest(request: InsertBookingRequest): Promise<BookingRequest>;
  getBookingRequests(): Promise<BookingRequest[]>;
  updateBookingRequestStatus(id: string, status: string, adminNotes?: string): Promise<BookingRequest>;
  approveBookingRequest(id: string, adminNotes?: string): Promise<void>;
  denyBookingRequest(id: string, adminNotes?: string): Promise<void>;
  
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getBookingSlotsForMonth(year: number, month: number): Promise<BookingSlot[]> {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = new Date(year, month, 0);
    const endDateStr = `${year}-${String(month).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;
    
    return await db.select().from(bookingSlots)
      .where(and(
        gte(bookingSlots.date, startDate),
        lte(bookingSlots.date, endDateStr)
      ));
  }

  async getBookingSlotsForYear(year: number): Promise<BookingSlot[]> {
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;
    
    return await db.select().from(bookingSlots)
      .where(and(
        gte(bookingSlots.date, startDate),
        lte(bookingSlots.date, endDate)
      ));
  }

  async createBookingSlot(slot: InsertBookingSlot): Promise<BookingSlot> {
    const [createdSlot] = await db.insert(bookingSlots).values(slot).returning();
    return createdSlot;
  }

  async initializeBookingSlotsForYear(year: number): Promise<void> {
    const slots = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dateStr = date.toISOString().split('T')[0];
      for (let slotNumber = 1; slotNumber <= 24; slotNumber++) {
        slots.push({
          date: dateStr,
          slotNumber,
          isAvailable: true
        });
      }
    }

    // Insert in batches to avoid query limits
    const batchSize = 1000;
    for (let i = 0; i < slots.length; i += batchSize) {
      const batch = slots.slice(i, i + batchSize);
      await db.insert(bookingSlots).values(batch);
    }
  }

  async createBookingRequest(request: InsertBookingRequest): Promise<BookingRequest> {
    const [createdRequest] = await db.insert(bookingRequests).values(request).returning();
    return createdRequest;
  }

  async getBookingRequests(): Promise<BookingRequest[]> {
    return await db.select().from(bookingRequests);
  }

  async updateBookingRequestStatus(id: string, status: string, adminNotes?: string): Promise<BookingRequest> {
    const [updatedRequest] = await db.update(bookingRequests)
      .set({ status, adminNotes })
      .where(eq(bookingRequests.id, id))
      .returning();
    return updatedRequest;
  }

  async approveBookingRequest(id: string, adminNotes?: string): Promise<void> {
    // Get the booking request
    const [request] = await db.select().from(bookingRequests).where(eq(bookingRequests.id, id));
    if (!request) throw new Error("Booking request not found");

    // Find an available slot for each day in the range
    const startDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);
    
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dateStr = date.toISOString().split('T')[0];
      
      // Find the first available slot for this date
      const [availableSlot] = await db.select().from(bookingSlots)
        .where(and(
          eq(bookingSlots.date, dateStr),
          eq(bookingSlots.isAvailable, true)
        ))
        .limit(1);

      if (availableSlot) {
        // Mark slot as unavailable and assign to booking
        await db.update(bookingSlots)
          .set({ isAvailable: false, bookedBy: id })
          .where(eq(bookingSlots.id, availableSlot.id));
      }
    }

    // Update request status
    await this.updateBookingRequestStatus(id, "approved", adminNotes);
  }

  async denyBookingRequest(id: string, adminNotes?: string): Promise<void> {
    await this.updateBookingRequestStatus(id, "denied", adminNotes);
  }

  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const [inquiry] = await db.insert(contactInquiries).values(insertInquiry).returning();
    return inquiry;
  }
}

export const storage = new DatabaseStorage();
