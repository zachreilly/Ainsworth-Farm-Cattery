import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, MapPin, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactInquirySchema } from "@shared/schema";
import type { InsertContactInquiry } from "@shared/schema";

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContactInquiry>({
    resolver: zodResolver(insertContactInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactInquiry) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Caroline will get back to you shortly.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactInquiry) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to book your cat's stay? Contact us to discuss your requirements and arrange a viewing.
            </p>
          </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Card className="bg-sage-50 mb-8">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="text-sage-600 h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                      <a href="tel:01923264503" className="text-sage-600 hover:text-sage-700 text-lg font-medium">
                        01923 264503
                      </a>
                      <p className="text-gray-600 text-sm mt-1">Call to discuss your requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-sage-600 h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                      <p className="text-gray-700 leading-relaxed">
                        Ainsworth Farm<br />
                        Bucks Hill<br />
                        Kings Langley WD4 9AP
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="text-sage-600 h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Opening Hours</h4>
                      <p className="text-gray-700 leading-relaxed">
                        <strong>Monday - Saturday</strong><br />
                        9:00 AM - 11:00 AM<br />
                        4:00 PM - 6:00 PM<br />
                        <strong>Sunday:</strong> Closed
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        Viewings, drop-offs and pick-ups by appointment
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-cream-50">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What to Expect</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <Check className="text-sage-600 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>Pre-booking consultation about your cat's needs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-sage-600 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>Optional cattery viewing before booking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-sage-600 h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>Flexible drop-off and pick-up times</span>
                  </li>

                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="bg-gray-50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h3>
                <div className="text-center mb-8">
                  <p className="text-xl text-gray-700 mb-2">Email:</p>
                  <a href="mailto:Cats@ainsworthfarm.co.uk" className="text-xl font-semibold text-sage-600 hover:text-sage-700">
                    Cats@ainsworthfarm.co.uk
                  </a>
                </div>
                
                <div className="bg-cream-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Useful Information and Tips for Us to Give Your Cat the Best Experience</h4>
                  <p className="text-gray-700 mb-4">
                    Please include the following details when contacting us:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-2">•</span>
                      <span><strong>Phone number</strong> - for quick communication</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-2">•</span>
                      <span><strong>Email address</strong> - for booking confirmations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-2">•</span>
                      <span><strong>Name of owner</strong> - your full name</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-2">•</span>
                      <span><strong>Name of cat</strong> - what we should call your cat</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-2">•</span>
                      <span><strong>Preferences and requirements of diet</strong> - special foods, feeding times, treats</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-2">•</span>
                      <span><strong>Any queries</strong> - questions about our facilities or services</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
