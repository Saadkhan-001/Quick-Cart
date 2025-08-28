
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const onboardingSlides = [
  {
    image: {
      src: 'https://images.unsplash.com/photo-1659353741155-e988422cf9ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMGJveSUyMHdpdGglMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzU2NDA3OTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      hint: 'delivery scooter',
    },
    title: 'Get groceries delivered in minutes',
    description: 'Shop from your favorite local stores with fast delivery',
  },
  {
    image: {
      src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      hint: 'grocery variety',
    },
    title: 'Shop from a wide variety of groceries',
    description: 'Choose from thousands of products across various categories.',
  },
  {
    image: {
      src: 'https://picsum.photos/400/302',
      hint: 'secure payment',
    },
    title: 'Secure Payments',
    description: 'Pay with your favorite method. All transactions are secure.',
  },
];

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
        if (currentSlide < onboardingSlides.length - 1) {
          setCurrentSlide(currentSlide + 1);
        } else {
          router.push('/login');
        }
        setIsAnimating(false);
    }, 500); // Animation duration
  };

  useEffect(() => {
    if (currentSlide < onboardingSlides.length - 1) {
      const timer = setTimeout(() => {
        handleNext();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide]);


  const handleSkip = () => {
    router.push('/login');
  };

  const { image, title, description } = onboardingSlides[currentSlide];

  return (
    <div className="flex flex-col h-screen bg-[#FAF8F1] relative">
       <Button variant="link" className="absolute top-4 right-4 z-10 text-muted-foreground" onClick={handleSkip}>Skip</Button>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className={cn("relative w-full max-w-sm aspect-[4/3] mb-8 transition-opacity duration-500", isAnimating ? 'opacity-0' : 'opacity-100')}>
            <Image
                src={image.src}
                alt={title}
                fill
                className="object-contain"
                data-ai-hint={image.hint}
            />
        </div>
        <div className={cn("transition-opacity duration-500", isAnimating ? 'opacity-0' : 'opacity-100')}>
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-muted-foreground max-w-sm">{description}</p>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center space-x-2">
          {onboardingSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                'h-2 w-2 rounded-full transition-all duration-300',
                currentSlide === index ? 'w-4 bg-[#FDBA43]' : 'bg-gray-300'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="flex justify-center items-center gap-4">
            <Button size="lg" className="w-full max-w-xs bg-[#FDBA43] text-black hover:bg-yellow-400" onClick={handleNext}>
                {currentSlide === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
            </Button>
        </div>
      </div>
    </div>
  );
}
