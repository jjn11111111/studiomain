'use client';

import { cn } from "@/lib/utils";

interface ColoredLetterTitleProps {
  title: string;
  className?: string;
}

export default function ColoredLetterTitle({ title, className }: ColoredLetterTitleProps) {
  if (!title) return null;

  const firstLetter = title.charAt(0);
  const restOfTitle = title.slice(1);

  return (
    <span className={cn(className)}>
      <span className="text-accent font-bold">({firstLetter})</span>
      {restOfTitle}
    </span>
  );
}
