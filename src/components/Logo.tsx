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
      </defs>
      <g stroke="currentColor" fill="none" strokeWidth="1">
        <circle cx="50" cy="50" r="38" />

        <path d="M50 18 C 65 18, 75 50, 75 50 S 65 82, 50 82" />
        <path d="M50 18 C 35 18, 25 50, 25 50 S 35 82, 50 82" />

        <path d="M50 18 C 62 18, 70 50, 70 50 S 62 82, 50 82" />
        <path d="M50 18 C 38 18, 30 50, 30 50 S 38 82, 50 82" />

        <path d="M50 18 C 59 18, 65 50, 65 50 S 59 82, 50 82" />
        <path d="M50 18 C 41 18, 35 50, 35 50 S 41 82, 50 82" />

        <path d="M50 18 C 56 18, 60 50, 60 50 S 56 82, 50 82" />
        <path d="M50 18 C 44 18, 40 50, 40 50 S 44 82, 50 82" />

        <circle cx="50" cy="50" r="10" />
        <circle cx="50" cy="50" r="15" />

      </g>
      <g fill="currentColor" stroke="none">
        <circle cx="50" cy="25" r="3" fill="#FFFFFF" />
        <circle cx="50" cy="32" r="3" fill="#9400D3" />
        <circle cx="50" cy="39" r="3" fill="#4B0082" />
        <circle cx="50" cy="46" r="3" fill="#0000FF" />
        <circle cx="50" cy="53" r="3" fill="#00FF00" />
        <circle cx="50" cy="60" r="3" fill="#FFFF00" />
        <circle cx="50" cy="67" r="3" fill="#FF7F00" />
        <circle cx="50" cy="74" r="3" fill="#FF0000" />
        <circle cx="50" cy="81" r="3" fill="#000000" />
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
