import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactInquirySchema, insertBookingRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Initialize booking slots for a year (admin only)
  app.post("/api/admin/initialize-year/:year", async (req, res) => {
    try {
      const year = parseInt(req.params.year);
      if (isNaN(year)) {
        return res.status(400).json({ message: "Invalid year" });
      }
      
      await storage.initializeBookingSlotsForYear(year);
      res.json({ message: `Booking slots initialized for ${year}` });
    } catch (error) {
      console.error("Error initializing booking slots:", error);
      res.status(500).json({ message: "Failed to initialize booking slots" });
    }
  });

  // Get booking slots for a specific month
  app.get("/api/booking-slots/:year/:month", async (req, res) => {
    try {
      const year = parseInt(req.params.year);
      const month = parseInt(req.params.month);
      
      if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
        return res.status(400).json({ message: "Invalid year or month" });
      }

      const bookingSlots = await storage.getBookingSlotsForMonth(year, month);
      res.json(bookingSlots);
    } catch (error) {
      console.error("Error fetching booking slots:", error);
      res.status(500).json({ message: "Failed to fetch booking slots" });
    }
  });

  // Get booking slots for entire year (admin view)
  app.get("/api/admin/booking-slots/:year", async (req, res) => {
    try {
      const year = parseInt(req.params.year);
      
      if (isNaN(year)) {
        return res.status(400).json({ message: "Invalid year" });
      }

      const bookingSlots = await storage.getBookingSlotsForYear(year);
      res.json(bookingSlots);
    } catch (error) {
      console.error("Error fetching booking slots:", error);
      res.status(500).json({ message: "Failed to fetch booking slots" });
    }
  });

  // Submit booking request
  app.post("/api/booking-request", async (req, res) => {
    try {
      const validatedData = insertBookingRequestSchema.parse(req.body);
      const request = await storage.createBookingRequest(validatedData);
      res.status(201).json(request);
    } catch (error) {
      console.error("Error creating booking request:", error);
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to submit booking request" });
      }
    }
  });

  // Get all booking requests (admin only)
  app.get("/api/admin/booking-requests", async (req, res) => {
    try {
      const requests = await storage.getBookingRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching booking requests:", error);
      res.status(500).json({ message: "Failed to fetch booking requests" });
    }
  });

  // Approve booking request (admin only)
  app.post("/api/admin/booking-requests/:id/approve", async (req, res) => {
    try {
      const { id } = req.params;
      const { adminNotes } = req.body;
      
      await storage.approveBookingRequest(id, adminNotes);
      res.json({ message: "Booking request approved" });
    } catch (error) {
      console.error("Error approving booking request:", error);
      res.status(500).json({ message: "Failed to approve booking request" });
    }
  });

  // Deny booking request (admin only)
  app.post("/api/admin/booking-requests/:id/deny", async (req, res) => {
    try {
      const { id } = req.params;
      const { adminNotes } = req.body;
      
      await storage.denyBookingRequest(id, adminNotes);
      res.json({ message: "Booking request denied" });
    } catch (error) {
      console.error("Error denying booking request:", error);
      res.status(500).json({ message: "Failed to deny booking request" });
    }
  });

  // Submit contact inquiry
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      res.status(201).json(inquiry);
    } catch (error) {
      console.error("Error creating contact inquiry:", error);
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to submit inquiry" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
