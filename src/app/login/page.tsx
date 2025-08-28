'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({
          title: 'Account Created',
          description: "We've created your account for you.",
        });
        router.push('/profile/create');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: 'Signed In',
          description: 'Welcome back!',
        });
        router.push('/');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: 'Signed In with Google',
        description: 'Welcome!',
      });
      router.push('/');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Google Sign-In Failed',
        description: error.message,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F1] p-6">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
            <h1 className="text-xl font-semibold text-gray-800">Quick Cart</h1>
        </div>

        <div className="w-full max-w-sm mx-auto">
            <h2 className="text-3xl font-bold mb-6">Sign in or create an account</h2>
            <form onSubmit={handleAuthAction} className="space-y-4">
                <div className="space-y-2">
                <Input 
                    id="email" 
                    type="email" 
                    placeholder="Email or phone" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#F5F2E8] border-none h-12"
                />
                </div>
                <div className="space-y-2">
                <Input 
                    id="password" 
                    type="password" 
                    placeholder="Password"
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#F5F2E8] border-none h-12"
                />
                </div>
                <Button type="submit" size="lg" className="w-full bg-[#FDBA43] text-black hover:bg-yellow-400 h-12">
                 {isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-sm">
                <span className="bg-[#FAF8F1] px-2 text-muted-foreground">Or continue with</span>
                </div>
            </div>

            <Button variant="outline" className="w-full bg-[#F5F2E8] border-none h-12" onClick={handleGoogleSignIn}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
                    <path fill="#4285F4" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20c0-1.341-.138-2.65-.389-3.917Z"></path><path fill="#34A853" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691Z"></path><path fill="#FBBC05" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44Z"></path><path fill="#EA4335" d="M43.611,20.083H42V20H24v8h11.303c-.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,35.244,44,30.036,44,24c0-1.341-.138-2.65-.389-3.917Z"></path>
                </svg>
                Continue with Google
            </Button>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 pb-4">
            <Button 
                variant="ghost" 
                size="lg" 
                onClick={() => setIsSignUp(true)} 
                className={cn(
                    "w-1/2", 
                    isSignUp ? "bg-[#F5F2E8] text-black" : "bg-transparent text-muted-foreground"
                )}
            >
                Sign up
            </Button>
            <Button 
                variant="ghost" 
                size="lg" 
                onClick={() => setIsSignUp(false)}
                className={cn(
                    "w-1/2", 
                    !isSignUp ? "bg-[#FDBA43] text-black" : "bg-transparent text-muted-foreground"
                )}
            >
                Sign In
            </Button>
        </div>
    </div>
  );
}
