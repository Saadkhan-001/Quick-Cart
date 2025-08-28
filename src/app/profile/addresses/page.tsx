
'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Briefcase, Plus, MoreVertical } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

const addresses = [
    { id: 'home', type: 'Home', address: '123 Elm Street, Apt 4B, Anytown, USA', icon: Home },
    { id: 'work', type: 'Work', address: '456 Oak Avenue, Anytown, USA', icon: Briefcase },
]

export default function SavedAddressesPage() {
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
                  <h1 className="text-xl font-bold">Saved Addresses</h1>
              </div>
          </div>
        </header>
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <RadioGroup defaultValue="home" className="space-y-4">
                {addresses.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                             <div className="p-3 bg-secondary rounded-lg">
                                <Icon className="h-6 w-6 text-secondary-foreground" />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor={item.id} className="font-semibold text-base">{item.type}</Label>
                                <p className="text-muted-foreground text-sm">{item.address}</p>
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
                    )
                })}
            </RadioGroup>
          </div>
        </main>
        <footer className="sticky bottom-0 bg-background border-t p-4 md:pb-4">
             <div className="container mx-auto max-w-xl">
                 <Button size="lg" className="w-full flex items-center gap-2">
                    <Plus />
                    Add New Address
                </Button>
             </div>
        </footer>
      </div>
    );
  }
