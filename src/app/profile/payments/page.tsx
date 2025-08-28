
'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, MoreVertical, CreditCard } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Separator } from '@/components/ui/separator';
import React from 'react';

const paymentMethods = [
    { id: 'card-1', type: 'Credit Card', details: '**** **** **** 1234', icon: () => (
        <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.5 0H2.5C1.125 0 0 1.125 0 2.5V17.5C0 18.875 1.125 20 2.5 20H29.5C30.875 20 32 18.875 32 17.5V2.5C32 1.125 30.875 0 29.5 0Z" fill="#4C4C4C"/>
            <path d="M32 6.25H0V5H32V6.25Z" fill="white"/>
            <path d="M5.1875 13.125C5.1875 12.0625 4.3125 11.25 3.125 11.25H2.5V15H3.125C4.3125 15 5.1875 14.1875 5.1875 13.125ZM3.75 13.125C3.75 13.5625 3.5 13.75 3.125 13.75H3.125V12.5H3.125C3.5 12.5 3.75 12.6875 3.75 13.125ZM8.75 15H9.375L7.6875 11.25H6.8125L5.125 15H5.75L6.1875 13.9375H8.3125L8.75 15ZM7.25 12.125L8.0625 13.3125H6.4375L7.25 12.125ZM12.1875 11.25H10.625V15H12.1875C13.5625 15 14.375 14.1875 14.375 13.125C14.375 12.0625 13.5625 11.25 12.1875 11.25ZM12.1875 13.75H11.25V12.5H12.1875C12.875 12.5 13.125 12.6875 13.125 13.125C13.125 13.5625 12.875 13.75 12.1875 13.75ZM15.625 11.25H15V15H15.625V11.25Z" fill="white"/>
        </svg>
    )},
    { id: 'card-2', type: 'PayPal', details: 'sophia.c@email.com', icon: () => (
        <svg width="32" height="20" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><path d="M35.16 4.665c-1.47-2.83-4.2-4.665-7.44-4.665h-15.6c-3.36 0-6.15 1.92-7.35 4.845l11.04 19.155h8.4l5.91-19.335z" fill="#003087"></path><path d="M35.16 4.665c-1.47-2.83-4.2-4.665-7.44-4.665h-15.6c-3.36 0-6.15 1.92-7.35 4.845.87-1.725 2.865-3.03 5.175-3.03h15.6c2.625 0 4.935 1.5 6.075 3.735l-5.16 17.505c.6-.96.9-2.07.9-3.21 0-2.4-1.29-4.545-3.225-5.655l4.305-14.15z" fill="#009cde"></path><path d="M12.915 24l-3.36-5.82-3.33 5.82h-5.7l11.04-19.155c1.2-2.925 3.99-4.845 7.35-4.845h3.15l-19.155 24z" fill="#002f86"></path></svg>
    )},
]

export default function SavedPaymentsPage() {
    const router = useRouter();
  
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="sticky top-0 z-40 w-full border-b bg-background">
          <div className="container flex h-16 items-center">
              <div className="relative flex w-full items-center justify-center">
                   <Button variant="ghost" size="icon" className="absolute left-0" onClick={() => router.back()}>
                      <ArrowLeft />
                      <span className="sr-only">Back</span>
                  </Button>
                  <h1 className="text-xl font-bold">Payment Methods</h1>
              </div>
          </div>
        </header>
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <RadioGroup defaultValue="card-1" className="space-y-4">
                {paymentMethods.map((item, index) => {
                    const Icon = item.icon;
                    return (
                       <div key={item.id}>
                            <div className="flex items-center space-x-4 p-4 border rounded-lg">
                                <div className="p-2 border rounded-md">
                                    <Icon />
                                </div>
                                <div className="flex-1">
                                    <Label htmlFor={item.id} className="font-semibold text-base">{item.type}</Label>
                                    <p className="text-muted-foreground text-sm">{item.details}</p>
                                </div>
                                <RadioGroupItem value={item.id} id={item.id} />
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-5 w-5" />
                                            <span className="sr-only">More options</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            {index < paymentMethods.length - 1 && <Separator className="my-4"/>}
                        </div>
                    )
                })}
            </RadioGroup>
          </div>
        </main>
        <footer className="sticky bottom-0 bg-background border-t p-4 md:pb-4">
             <div className="container mx-auto max-w-xl">
                 <Button size="lg" className="w-full flex items-center gap-2">
                    <Plus />
                    Add New Payment Method
                </Button>
             </div>
        </footer>
      </div>
    );
  }
