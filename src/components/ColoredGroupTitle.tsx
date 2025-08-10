'use client';

interface ColoredGroupTitleProps {
  title: string;
}

export function ColoredGroupTitle({ title }: ColoredGroupTitleProps) {
  const parts = title.split(' ');
  const colorWordIndex = parts.findIndex(part => ['Red', 'Yellow', 'Blue'].includes(part));

  if (colorWordIndex === -1) {
    return <>{title}</>;
  }

  const colorWord = parts[colorWordIndex];
  const colorClass = `text-primary`;

  return (
    <>
      {parts.slice(0, colorWordIndex).join(' ')}
      {' '}
      <span className={colorClass}>{colorWord}</span>
      {' '}
      {parts.slice(colorWordIndex + 1).join(' ')}
    </>
  );
}
