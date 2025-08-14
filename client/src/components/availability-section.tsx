import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Availability } from "@shared/schema";

export default function AvailabilitySection() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11)); // December 2024
  
  const { data: availability, isLoading } = useQuery<Availability[]>({
    queryKey: ["/api/availability", currentDate.getFullYear(), currentDate.getMonth() + 1],
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
      const availabilityData = availability?.find(a => a.date === dateStr);
      const isAvailable = availabilityData ? availabilityData.isAvailable : true;
      
      days.push({
        day,
        isAvailable,
        dateStr
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
                  <div key={index} className="h-12 flex items-center justify-center">
                    {day && (
                      <div
                        className={`w-full h-full rounded-lg border flex items-center justify-center cursor-pointer transition-colors ${
                          day.isAvailable
                            ? "bg-green-100 hover:bg-green-200 border-green-300"
                            : "bg-red-100 border-red-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {day.day}
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
            </div>
            
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
    </section>
  );
}
