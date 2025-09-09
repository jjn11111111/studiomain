
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
    
    switch (unitNumber) {
      case '1':
        return 'text-red-600';
      case '2':
        return 'text-yellow-500';
      case '3':
        return 'text-blue-600';
      default:
        return 'text-primary';
    }
  }

  return (
    <span className={cn(className)}>
      <span className={cn("font-bold", getColorClass(unitId))}>({firstLetter})</span>{restOfTitle}
    </span>
  );
}
