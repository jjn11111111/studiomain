'use client';

import { exerciseData } from '@/lib/data';
import UnitCard from './UnitCard';
import { useProgress } from '@/hooks/use-progress';
import { BrainCircuit } from 'lucide-react';

export default function TrainingPage() {
  const { completedVideos, isInitialized } = useProgress();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2 flex items-center justify-center gap-4">
          <BrainCircuit className="w-12 h-12" />
          Training Curriculum
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          These visual exercises emerge from years of of personal reflection and study. The exercises combine features of visual optics, spactial depth, super symmetry, and directions of rotation or spin. By following the prescribed methods included with these exercises, a unique perspective of observation is achieved. Purposeful and sustained alterations of visual optics which govern human sight coalesce into a visual experience which utilizes and stimulates structures of the brain and visual cortex, and thereby stimulate interior components of the brain, namely the pineal gland.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
        {exerciseData.map((unit) => (
          <UnitCard 
            key={unit.id} 
            unit={unit} 
            completedVideos={completedVideos} 
            isInitialized={isInitialized}
          />
        ))}
      </div>
    </div>
  );
}
