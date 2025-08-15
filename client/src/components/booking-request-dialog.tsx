import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertBookingRequestSchema } from "@shared/schema";
import type { InsertBookingRequest } from "@shared/schema";

interface BookingRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDates: string[];
}

export default function BookingRequestDialog({ 
  isOpen, 
  onClose, 
  selectedDates 
}: BookingRequestDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertBookingRequest>({
    resolver: zodResolver(insertBookingRequestSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      catName: "",
      startDate: selectedDates[0] || "",
      endDate: selectedDates[selectedDates.length - 1] || "",
      specialRequirements: "",
    },
  });

  // Update form values when selected dates change
  useState(() => {
    if (selectedDates.length > 0) {
      form.setValue("startDate", selectedDates[0]);
      form.setValue("endDate", selectedDates[selectedDates.length - 1]);
    }
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: InsertBookingRequest) => {
      const response = await apiRequest("POST", "/api/booking-request", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking request submitted!",
        description: "Caroline will review your request and get back to you shortly.",
      });
      form.reset();
      onClose();
      // Invalidate booking slots to refresh availability
      queryClient.invalidateQueries({ queryKey: ["/api/booking-slots"] });
    },
    onError: (error) => {
      toast({
        title: "Failed to submit booking request",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBookingRequest) => {
    bookingMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Request Your Cat's Stay</DialogTitle>
        </DialogHeader>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Selected Dates</h4>
          <div className="flex flex-wrap gap-2">
            {selectedDates.map(date => (
              <span key={date} className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-sm">
                {new Date(date).toLocaleDateString()}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Total days: {selectedDates.length} • Rate: £15 per day • Total: £{selectedDates.length * 15}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="catName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cat's Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your cat's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="customerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="specialRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requirements</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Tell us about your cat's dietary needs, medical requirements, behavior, or any other special care instructions..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-cream-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Caroline will review your booking request within 24 hours</li>
                <li>• You'll receive confirmation via email or phone</li>
                <li>• A cattery viewing can be arranged before your booking</li>
                <li>• Payment is due on drop-off day</li>
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={bookingMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-sage-600 hover:bg-sage-700 text-white"
                disabled={bookingMutation.isPending}
              >
                {bookingMutation.isPending ? "Submitting..." : "Submit Booking Request"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}