'use client';

import { cn } from "@/lib/utils";

interface ColoredGroupTitleProps {
  title: string;
  className?: string;
}

export function ColoredGroupTitle({ title, className }: ColoredGroupTitleProps) {
  const parts = title.split(' ');
  const colorWordIndex = parts.findIndex(part => ['Red', 'Yellow', 'Blue'].includes(part));

  if (colorWordIndex === -1) {
    return <>{title}</>;
  }

  const colorWord = parts[colorWordIndex];
  
  return (
    <span className={cn(className)}>
      {parts.slice(0, colorWordIndex).join(' ')}
      {' '}
      <span className="text-primary">{colorWord}</span>
      {' '}
      {parts.slice(colorWordIndex + 1).join(' ')}
    </span>
  );
}
