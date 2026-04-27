import { cn } from "@/app/lib/utils";

interface ArrowIconProps {
  className?: string;
}

export default function UnderlineArrowIcon({ className }: ArrowIconProps) {
  return (
    <svg
      width="40"
      height="41"
      viewBox="0 0 40 41"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-8 h-8", className)}
    >
      <path
        d="M19.5356 2.5V34.5M19.5356 34.5L35.5356 18.5M19.5356 34.5L3.53564 18.5"
        stroke="#111111"
        stroke-width="5"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
      <path d="M0.535645 38.5H38.5356" stroke="#111111" stroke-width="5" />
    </svg>
  );
}
