'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
      src: 'https://picsum.photos/400/301',
      hint: 'grocery variety',
    },
    title: 'Wide Variety',
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
  const router = useRouter();

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.push('/login');
    }
  };

  const handleSkip = () => {
    router.push('/login');
  };

  const { image, title, description } = onboardingSlides[currentSlide];

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="relative w-full max-w-sm aspect-[4/3] mb-8">
            <Image
                src={image.src}
                alt={title}
                fill
                className="object-contain"
                data-ai-hint={image.hint}
            />
        </div>
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground max-w-sm">{description}</p>
      </div>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center">
          {onboardingSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                'h-2 w-2 rounded-full mx-1.5 transition-all duration-300',
                currentSlide === index ? 'w-4 bg-accent' : 'bg-muted'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="flex justify-between items-center gap-4">
            <Button variant="ghost" className="w-1/2" size="lg" onClick={handleSkip}>Skip</Button>
            <Button size="lg" className="w-1/2 bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleNext}>
                {currentSlide === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
            </Button>
        </div>
      </div>
    </div>
  );
}
