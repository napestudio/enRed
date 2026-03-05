import { cn } from "../lib/utils";

function SectionHeading({
  title = "",
  style = "text-black",
}: {
  title: string;
  style: string;
}) {
  return (
    <>
      <h2 className="text-5xl font-semibold">{title}</h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          style,
          "lucide lucide-arrow-down-to-line-icon lucide-arrow-down-to-line w-12 h-12",
        )}
      >
        <path d="M12 17V3" />
        <path d="m6 11 6 6 6-6" />
        <path d="M19 21H5" />
      </svg>
    </>
  );
}

export default SectionHeading;
