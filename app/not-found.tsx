import Link from "next/link";
import NotFoundExperience from "./components/experience/NotFoundExperience";
import ArrowIcon from "./components/ui/Icons/ArrowIcon";

export default function NotFound() {
  return (
    <div className="h-svh">
      <NotFoundExperience />
      <div className="fixed inset-0 z-100 flex flex-col items-center justify-end gap-6 pointer-events-none py-10">
        <p className="text-2xl font-semibold text-white drop-shadow-lg">
          Página no encontrada
        </p>
        <Link
          href="/"
          className="flex items-center gap-2 pointer-events-auto px-6 py-3 text-white font-medium  transition-colors"
        >
          <ArrowIcon className="rotate-180" />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
