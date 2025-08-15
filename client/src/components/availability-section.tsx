import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { BookingSlot } from "@shared/schema";
import BookingRequestDialog from "./booking-request-dialog";

export default function AvailabilitySection() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11)); // December 2024
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const { data: bookingSlots, isLoading } = useQuery<BookingSlot[]>({
    queryKey: ["/api/booking-slots", currentDate.getFullYear(), currentDate.getMonth() + 1],
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const toggleDateSelection = (dateStr: string) => {
    setSelectedDates(prev => {
      if (prev.includes(dateStr)) {
        return prev.filter(d => d !== dateStr);
      } else {
        return [...prev, dateStr].sort();
      }
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // Check if date has any available slots
      const dateSlotsAvailable = bookingSlots?.filter(slot => 
        slot.date === dateStr && slot.isAvailable
      ).length || 0;
      
      const isAvailable = dateSlotsAvailable > 0;
      const availabilityText = dateSlotsAvailable > 0 ? `${dateSlotsAvailable} slots` : 'Full';
      
      days.push({
        day,
        isAvailable,
        dateStr,
        availabilityText,
        slotsAvailable: dateSlotsAvailable
      });
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);

  return (
    <section id="availability" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Check Availability
          </h2>
          <p className="text-xl text-gray-600">
            View our current availability and plan your cat's stay. Call Caroline to make a reservation.
          </p>
        </div>
        
        <Card className="bg-cream-50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={previousMonth}
                  className="p-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextMonth}
                  className="p-2"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="text-center py-2 text-sm font-semibold text-gray-600">
                  {day}
                </div>
              ))}
            </div>
            
            {isLoading ? (
              <div className="text-center py-8">Loading availability...</div>
            ) : (
              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => (
                  <div key={index} className="h-16 flex items-center justify-center">
                    {day && (
                      <div
                        onClick={() => day.isAvailable && toggleDateSelection(day.dateStr)}
                        className={`w-full h-full rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-colors text-sm ${
                          selectedDates.includes(day.dateStr)
                            ? "bg-sage-200 border-sage-400 ring-2 ring-sage-500"
                            : day.isAvailable
                            ? "bg-green-100 hover:bg-green-200 border-green-300"
                            : "bg-red-100 border-red-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <span className="font-medium">{day.day}</span>
                        <span className="text-xs">{day.availabilityText}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-center gap-8 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                <span className="text-sm text-gray-600">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                <span className="text-sm text-gray-600">Fully Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-sage-200 border border-sage-400 rounded"></div>
                <span className="text-sm text-gray-600">Selected</span>
              </div>
            </div>

            {selectedDates.length > 0 && (
              <div className="mt-6 p-4 bg-sage-50 rounded-lg">
                <div className="text-center mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Selected Dates</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {selectedDates.map(date => (
                      <span key={date} className="px-3 py-1 bg-sage-200 text-sage-800 rounded-full text-sm">
                        {new Date(date).toLocaleDateString()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <Button
                    onClick={() => setIsBookingDialogOpen(true)}
                    className="bg-sage-600 hover:bg-sage-700 text-white px-6 py-2 mr-2"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Request Booking
                  </Button>
                  <Button
                    onClick={() => setSelectedDates([])}
                    variant="outline"
                    className="border-sage-600 text-sage-600 hover:bg-sage-50 px-6 py-2"
                  >
                    Clear Selection
                  </Button>
                </div>
              </div>
            )}
            
            <div className="text-center mt-8">
              <Button
                asChild
                className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 text-lg font-semibold"
                size="lg"
              >
                <a href="tel:01923264503">
                  <Phone className="mr-2 h-5 w-5" />
                  Call to Book: 01923 264503
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <BookingRequestDialog
        isOpen={isBookingDialogOpen}
        onClose={() => {
          setIsBookingDialogOpen(false);
          setSelectedDates([]);
        }}
        selectedDates={selectedDates}
      />
    </section>
  );
}
