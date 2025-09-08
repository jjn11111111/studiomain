'use client';

import { cn } from "@/lib/utils";

interface ColoredLetterTitleProps {
  title: string;
  className?: string;
}

export default function ColoredLetterTitle({ title, className }: ColoredLetterTitleProps) {
  if (!title) return null;

  return (
    <span className={cn(className)}>
      {title}
    </span>
  );
}
