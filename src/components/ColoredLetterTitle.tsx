'use client';

import { cn } from "@/lib/utils";

interface ColoredLetterTitleProps {
  title: string;
  className?: string;
  unitId?: string;
}

export default function ColoredLetterTitle({ title, className, unitId }: ColoredLetterTitleProps) {
  if (!title) return null;

  const firstLetter = title.charAt(0);
  const restOfTitle = title.substring(1);

  const getColorClass = (id: string | undefined) => {
    if (!id) return 'text-primary';
    const unitNumber = id.split('-')[1];
    return `text-unit-${unitNumber}`;
  }

  return (
    <span className={cn(className)}>
      <span className={cn("font-bold", getColorClass(unitId))}>({firstLetter})</span>{restOfTitle}
    </span>
  );
}
