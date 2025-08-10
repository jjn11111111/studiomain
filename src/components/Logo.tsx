import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("fill-current", className)}
    >
      <g transform="translate(50,50)">
        <path
          d="M0,-45 A45,45 0 1 1 0,45 A45,45 0 1 1 0,-45 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M-20,-20 L20,20 M20,-20 L-20,20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="0" cy="0" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path
          d="M0,-25 A25,25 0 0 1 21.65,12.5 A25,25 0 0 1 -21.65,12.5 A25,25 0 0 1 0,-25 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
