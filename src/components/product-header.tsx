
'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ProductHeader() {
  const router = useRouter();
  const { toast } = useToast();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      }).catch(console.error);
    } else {
        navigator.clipboard.writeText(window.location.href);
        toast({
            title: "Copied to clipboard",
            description: "Product link has been copied to your clipboard.",
        })
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-4">
      <div className="container mx-auto flex items-center justify-between">
            <Button variant="ghost" size="icon" className="bg-background/50 hover:bg-background/80 rounded-full" onClick={() => router.back()}>
                <ArrowLeft />
                 <span className="sr-only">Back</span>
            </Button>
            <Button variant="ghost" size="icon" className="bg-background/50 hover:bg-background/80 rounded-full" onClick={handleShare}>
                <Share2 />
                 <span className="sr-only">Share</span>
            </Button>
      </div>
    </header>
  );
}
