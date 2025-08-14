import { type User, type InsertUser, type Availability, type InsertAvailability, type ContactInquiry, type InsertContactInquiry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAvailabilityForMonth(year: number, month: number): Promise<Availability[]>;
  createAvailability(availability: InsertAvailability): Promise<Availability>;
  
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private availability: Map<string, Availability>;
  private contactInquiries: Map<string, ContactInquiry>;

  constructor() {
    this.users = new Map();
    this.availability = new Map();
    this.contactInquiries = new Map();
    
    // Initialize with some mock availability data for December 2024
    this.initializeMockAvailability();
  }

  private initializeMockAvailability() {
    const mockDates = [
      { date: "2024-12-03", isAvailable: false },
      { date: "2024-12-06", isAvailable: false },
      { date: "2024-12-07", isAvailable: false },
      { date: "2024-12-14", isAvailable: false },
      { date: "2024-12-20", isAvailable: false },
      { date: "2024-12-21", isAvailable: false },
      { date: "2024-12-22", isAvailable: false },
      { date: "2024-12-23", isAvailable: false },
      { date: "2024-12-24", isAvailable: false },
      { date: "2024-12-25", isAvailable: false },
    ];

    mockDates.forEach(mock => {
      const id = randomUUID();
      const availability: Availability = {
        id,
        date: mock.date,
        isAvailable: mock.isAvailable,
      };
      this.availability.set(id, availability);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAvailabilityForMonth(year: number, month: number): Promise<Availability[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    return Array.from(this.availability.values()).filter(avail => {
      const availDate = new Date(avail.date);
      return availDate >= startDate && availDate <= endDate;
    });
  }

  async createAvailability(insertAvailability: InsertAvailability): Promise<Availability> {
    const id = randomUUID();
    const availability: Availability = { ...insertAvailability, id };
    this.availability.set(id, availability);
    return availability;
  }

  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const id = randomUUID();
    const inquiry: ContactInquiry = { 
      ...insertInquiry, 
      id,
      createdAt: new Date().toISOString()
    };
    this.contactInquiries.set(id, inquiry);
    return inquiry;
  }
}

export const storage = new MemStorage();
