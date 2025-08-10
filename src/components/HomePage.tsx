'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Eye, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Logo from './Logo';

export default function HomePage() {
  return (
    <div className={cn('flex flex-col items-center justify-center flex-grow w-full h-full dark')}>
      <div className="absolute inset-0 w-full h-full aurora-bg" />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center text-center text-primary-foreground p-8"
      >
        <div className="mb-8">
          <Logo className="w-48 h-48 md:w-64 md:h-64 text-primary-foreground" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
          3rd Eye CrossTraining
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-primary-foreground/80 mb-12">
          Stimulate your pineal gland and unlock new dimensions of perception with our unique stereoscopic video exercises.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-primary-foreground/50">
            <Link href="/training">
              <Eye className="mr-2" />
              Begin Training
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10 hover:text-primary-foreground">
             <Link href="/about">
              <Zap className="mr-2" />
              Learn More
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
