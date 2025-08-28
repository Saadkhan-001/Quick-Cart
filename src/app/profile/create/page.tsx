
'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Camera, User } from 'lucide-react';
import { useState, useRef } from 'react';
import { auth } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function CreateProfilePage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  
  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Not Authenticated',
        description: 'You must be logged in to create a profile.',
      });
      router.push('/login');
      return;
    }

    try {
      await updateProfile(user, {
        displayName: fullName,
        // photoURL: '...' // TODO: Add photo upload logic here
      });

      toast({
        title: 'Profile Saved',
        description: 'Your profile has been updated successfully.',
      });

      router.push('/');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md bg-background">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <Avatar className="h-28 w-28 border-2 border-primary/50">
            {imagePreview ? (
              <AvatarImage src={imagePreview} />
            ) : <AvatarFallback>
              <User className="h-12 w-12 text-muted-foreground" />
            </AvatarFallback>}
            
          </Avatar>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
          <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background" onClick={handleCameraClick}>
            <Camera className="h-4 w-4" />
            <span className="sr-only">Upload Photo</span>
          </Button>
        </div>
        <div className="space-y-1">
            <h2 className="text-xl font-semibold">Add a profile photo</h2>
            <p className="text-sm text-muted-foreground">This helps your delivery person identify you</p>
        </div>
      </div>
      
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6 mt-8">
          <div className="space-y-2">
            <Label htmlFor="fullname" className="sr-only">Full Name</Label>
            <Input id="fullname" placeholder="Full Name" className="h-12 bg-muted/50 border-0" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile" className="sr-only">Mobile Number</Label>
            <Input id="mobile" type="tel" placeholder="Mobile Number" className="h-12 bg-muted/50 border-0" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="address" className="sr-only">Address</Label>
            <Textarea id="address" placeholder="Address" className="min-h-[100px] bg-muted/50 border-0" />
          </div>
          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">Save & Continue</Button>
      </form>
    </div>
  );
}
