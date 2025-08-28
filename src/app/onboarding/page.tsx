'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Truck, Package, CreditCard, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const onboardingSlides = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Get your groceries delivered to your doorstep in record time.',
  },
  {
    icon: Package,
    title: 'Wide Variety',
    description: 'Choose from thousands of products across various categories.',
  },
  {
    icon: CreditCard,
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

  const { icon: Icon, title, description } = onboardingSlides[currentSlide];

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex justify-end p-4">
        <Button variant="ghost" onClick={handleSkip}>Skip</Button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="bg-primary/10 p-8 rounded-full mb-8">
            <Icon className="h-20 w-20 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground max-w-sm">{description}</p>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-center mb-6">
          {onboardingSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                'h-2 w-2 rounded-full mx-1 transition-all',
                currentSlide === index ? 'w-4 bg-primary' : 'bg-muted'
              )}
            />
          ))}
        </div>
        <Button size="lg" className="w-full" onClick={handleNext}>
          {currentSlide === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
