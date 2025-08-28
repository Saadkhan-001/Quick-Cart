import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MessageSquare } from 'lucide-react';
  
  export default function HelpAndSupportPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Help & Support</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I track my order?</AccordionTrigger>
                <AccordionContent>
                  You can track your order in the "Order Tracking" page, accessible from your order history.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What are the delivery charges?</AccordionTrigger>
                <AccordionContent>
                  Delivery charges vary based on your location and order total. The exact amount will be displayed at checkout. We offer free delivery on your first three orders!
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How do I return an item?</AccordionTrigger>
                <AccordionContent>
                  Please contact our support team through live chat or phone to initiate a return.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
  
        <Card>
            <CardHeader>
                <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" size="lg" className="w-full">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us
                </Button>
                <Button size="lg" className="w-full">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Live Chat
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }
  