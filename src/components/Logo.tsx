import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("fill-current", className)}
    >
      <defs>
        <path id="circlePath" d="M 10,50 A 40,40 0 1 1 90,50 A 40,40 0 1 1 10,50" />
        <radialGradient id="orbGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="hsl(var(--primary-foreground))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--primary-foreground))" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Floating background orb */}
      <circle cx="50" cy="50" r="30" fill="url(#orbGradient)" stroke="none" opacity="0.5" />

      {/* Chakra points (inside the cage) */}
      <g fill="currentColor" stroke="none">
        <circle cx="50" cy="25" r="3" fill="#FFFFFF" />
        <circle cx="50" cy="32" r="3" fill="#9400D3" />
        <circle cx="50" cy="39" r="3" fill="#4B0082" />
        <circle cx="50" cy="46" r="3" fill="#0000FF" />
        <circle cx="50" cy="53" r="3" fill="#00FF00" />
        <circle cx="50" cy="60" r="3" fill="#FFFF00" />
        <circle cx="50" cy="67" r="3" fill="#FF7F00" />
        <circle cx="50" cy="74" r="3" fill="#FF0000" />
        <circle cx="50" cy="79" r="3" fill="#000000" />
      </g>

      {/* Rings (the "cage") */}
      <g stroke="currentColor" fill="none" strokeWidth="1">
        <circle cx="50" cy="50" r="38" />

        {/* 6 congruent oblong rings */}
        <path d="M50 18 C 70 18, 80 50, 80 50 S 70 82, 50 82" />
        <path d="M50 18 C 30 18, 20 50, 20 50 S 30 82, 50 82" />

        <path d="M50 18 C 65 18, 75 50, 75 50 S 65 82, 50 82" />
        <path d="M50 18 C 35 18, 25 50, 25 50 S 35 82, 50 82" />

        <path d="M50 18 C 60 18, 70 50, 70 50 S 60 82, 50 82" />
        <path d="M50 18 C 40 18, 30 50, 30 50 S 40 82, 50 82" />

        <path d="M50 18 C 55 18, 65 50, 65 50 S 55 82, 50 82" />
        <path d="M50 18 C 45 18, 35 50, 35 50 S 45 82, 50 82" />

        <path d="M50 18 C 52.5 18, 60 50, 60 50 S 52.5 82, 50 82" />
        <path d="M50 18 C 47.5 18, 40 50, 40 50 S 47.5 82, 50 82" />
        
        <path d="M50 18 C 51.25 18, 55 50, 55 50 S 51.25 82, 50 82" />
        <path d="M50 18 C 48.75 18, 45 50, 45 50 S 48.75 82, 50 82" />
        
      </g>
      
       <text
        fontFamily="Oswald, sans-serif"
        fontSize="14"
        fontWeight="bold"
        fill="currentColor"
        textAnchor="middle"
      >
        <textPath href="#circlePath" startOffset="25%">
          re:connect
        </textPath>
        <textPath href="#circlePath" startOffset="75%">
          zero
        </textPath>
      </text>
    </svg>
  );
}
