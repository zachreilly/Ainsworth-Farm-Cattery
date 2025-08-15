import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Check, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { BookingSlot, BookingRequest } from "@shared/schema";

export default function Admin() {
  const [currentYear, setCurrentYear] = useState(2024);
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: bookingSlots, isLoading: slotsLoading } = useQuery<BookingSlot[]>({
    queryKey: ["/api/admin/booking-slots", currentYear],
  });

  const { data: bookingRequests, isLoading: requestsLoading } = useQuery<BookingRequest[]>({
    queryKey: ["/api/admin/booking-requests"],
  });

  const approveMutation = useMutation({
    mutationFn: async ({ id, adminNotes }: { id: string; adminNotes: string }) => {
      await apiRequest("POST", `/api/admin/booking-requests/${id}/approve`, { adminNotes });
    },
    onSuccess: () => {
      toast({ title: "Booking request approved successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/booking-requests"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/booking-slots"] });
      setSelectedRequest(null);
      setAdminNotes("");
    },
    onError: (error) => {
      toast({ title: "Failed to approve request", description: error.message, variant: "destructive" });
    },
  });

  const denyMutation = useMutation({
    mutationFn: async ({ id, adminNotes }: { id: string; adminNotes: string }) => {
      await apiRequest("POST", `/api/admin/booking-requests/${id}/deny`, { adminNotes });
    },
    onSuccess: () => {
      toast({ title: "Booking request denied" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/booking-requests"] });
      setSelectedRequest(null);
      setAdminNotes("");
    },
    onError: (error) => {
      toast({ title: "Failed to deny request", description: error.message, variant: "destructive" });
    },
  });

  // Create calendar structure: 365 days x 24 slots
  const createCalendarData = () => {
    const calendar: { [key: string]: BookingSlot[] } = {};
    
    if (!bookingSlots) return calendar;

    // Group slots by date
    bookingSlots.forEach(slot => {
      if (!calendar[slot.date]) {
        calendar[slot.date] = [];
      }
      calendar[slot.date].push(slot);
    });

    // Ensure all dates have 24 slots (fill missing ones as available)
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear, 11, 31);
    
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dateStr = date.toISOString().split('T')[0];
      if (!calendar[dateStr]) {
        calendar[dateStr] = [];
      }
      
      // Ensure 24 slots per day
      for (let slot = 1; slot <= 24; slot++) {
        const existingSlot = calendar[dateStr].find(s => s.slotNumber === slot);
        if (!existingSlot) {
          calendar[dateStr].push({
            id: `${dateStr}-${slot}`,
            date: dateStr,
            slotNumber: slot,
            isAvailable: true,
            bookedBy: null
          });
        }
      }
      
      // Sort slots by slot number
      calendar[dateStr].sort((a, b) => a.slotNumber - b.slotNumber);
    }

    return calendar;
  };

  const calendarData = createCalendarData();
  const dates = Object.keys(calendarData).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
            Cattery Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage booking requests and view availability calendar
          </p>
        </div>

        {/* Year Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentYear(prev => prev - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              {currentYear - 1}
            </Button>
            <h2 className="text-2xl font-semibold">{currentYear} Calendar</h2>
            <Button
              variant="outline"
              onClick={() => setCurrentYear(prev => prev + 1)}
            >
              {currentYear + 1}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Booking Requests Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pending Booking Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {requestsLoading ? (
              <div className="text-center py-4">Loading requests...</div>
            ) : !bookingRequests?.length ? (
              <div className="text-center py-8 text-gray-500">
                No booking requests at this time
              </div>
            ) : (
              <div className="space-y-4">
                {bookingRequests
                  .filter(req => req.status === 'pending')
                  .map(request => (
                    <div key={request.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{request.customerName}</h3>
                          <p className="text-gray-600">Cat: {request.catName}</p>
                          <p className="text-gray-600">
                            {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                          </p>
                          <p className="text-gray-600">{request.customerEmail}</p>
                          {request.customerPhone && <p className="text-gray-600">{request.customerPhone}</p>}
                          <p className="text-sm text-gray-500 mt-2">
                            Submitted: {new Date(request.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedRequest(request)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Calendar Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Availability Calendar - {currentYear}</CardTitle>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border rounded"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 border rounded"></div>
                <span>Booked</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {slotsLoading ? (
              <div className="text-center py-8">Loading calendar...</div>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-max">
                  {/* Header Row - Slots 1-24 */}
                  <div className="grid grid-cols-[120px_repeat(24,30px)] gap-1 mb-2">
                    <div className="font-semibold text-sm bg-gray-100 p-2 rounded">Date</div>
                    {Array.from({ length: 24 }, (_, i) => (
                      <div key={i} className="text-xs font-medium text-center bg-gray-100 p-1 rounded">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar Rows */}
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {dates.map(date => (
                      <div key={date} className="grid grid-cols-[120px_repeat(24,30px)] gap-1">
                        <div className="text-sm font-medium bg-gray-50 p-2 rounded">
                          {new Date(date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        {calendarData[date]?.map(slot => (
                          <div
                            key={`${slot.date}-${slot.slotNumber}`}
                            className={`h-6 rounded border text-xs flex items-center justify-center ${
                              slot.isAvailable 
                                ? 'bg-green-100 border-green-300' 
                                : 'bg-red-100 border-red-300'
                            }`}
                            title={`Slot ${slot.slotNumber} - ${slot.isAvailable ? 'Available' : 'Booked'}`}
                          >
                            {slot.isAvailable ? '✓' : '✗'}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Booking Request Review Dialog */}
      {selectedRequest && (
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Review Booking Request</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Customer Details</h4>
                  <p><strong>Name:</strong> {selectedRequest.customerName}</p>
                  <p><strong>Email:</strong> {selectedRequest.customerEmail}</p>
                  <p><strong>Phone:</strong> {selectedRequest.customerPhone || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Booking Details</h4>
                  <p><strong>Cat Name:</strong> {selectedRequest.catName}</p>
                  <p><strong>Start Date:</strong> {new Date(selectedRequest.startDate).toLocaleDateString()}</p>
                  <p><strong>End Date:</strong> {new Date(selectedRequest.endDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              {selectedRequest.specialRequirements && (
                <div>
                  <h4 className="font-semibold">Special Requirements</h4>
                  <p className="text-gray-700">{selectedRequest.specialRequirements}</p>
                </div>
              )}
              
              <div>
                <label className="block font-semibold mb-2">Admin Notes</label>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add any notes for the customer..."
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedRequest(null);
                    setAdminNotes("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => denyMutation.mutate({ 
                    id: selectedRequest.id, 
                    adminNotes 
                  })}
                  disabled={denyMutation.isPending}
                >
                  <X className="h-4 w-4 mr-1" />
                  Deny Request
                </Button>
                <Button
                  onClick={() => approveMutation.mutate({ 
                    id: selectedRequest.id, 
                    adminNotes 
                  })}
                  disabled={approveMutation.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Approve Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}