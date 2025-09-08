'use client';

import { useActionState, useEffect, useRef } from 'react';
import type { Unit, Video } from '@/lib/data';
import { getAffirmationAction } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AffirmationGeneratorProps {
  unit: Unit;
  video: Video;
}

const initialState = {
  data: null,
  error: null,
  status: 'initial' as 'initial' | 'pending' | 'success' | 'error',
};

export default function AffirmationGenerator({ unit, video }: AffirmationGeneratorProps) {
  const [state, formAction, isPending] = useActionState(getAffirmationAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === 'error' && state.error) {
      toast({
        variant: 'destructive',
        title: 'AI Guidance Error',
        description: state.error,
      });
    }
  }, [state.status, state.error, toast]);

  return (
    <Card className="h-full flex flex-col bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-accent">
          <Sparkles className="h-6 w-6" />
          AI-Powered Guidance
        </CardTitle>
        <CardDescription>
          Generate a personal affirmation to enhance your practice and deepen its benefits.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {isPending && (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-4 text-muted-foreground animate-pulse">
                <Loader2 className="h-12 w-12 animate-spin text-accent" />
                <p>Generating your personal affirmation...</p>
            </div>
          </div>
        )}
        {state.status === 'success' && state.data && (
           <div className="space-y-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
              <p className="text-lg font-semibold text-primary font-headline italic">
                "{state.data.affirmation}"
              </p>
              <p className="text-muted-foreground">{state.data.explanation}</p>
          </div>
        )}
        {state.status === 'initial' && (
            <div className="flex items-center justify-center h-full text-center text-muted-foreground p-4 rounded-lg border border-dashed">
                <p>Click the button below to receive your affirmation.</p>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <form action={formAction} ref={formRef} className="w-full">
          <input type="hidden" name="unit" value={unit?.title ?? ''} />
          <input type="hidden" name="videoTitle" value={video?.title ?? ''} />
          <input type="hidden" name="videoDescription" value={video?.description ?? ''} />
          <Button type="submit" disabled={isPending || !unit || !video} className="w-full bg-accent hover:bg-accent/90">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate Affirmation
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
