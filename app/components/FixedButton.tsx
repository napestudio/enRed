import EnRedIso from "./ui/Icons/EnRedIso";

export default function FixedButton() {
  return (
    <div className="z-90 fixed top-0 bottom-0 right-0 h-full pointer-events-none">
      <div className="relative rotate-90 top-[55svh] right-5 origin-right py-2 px-6 h-max bg-black text-white flex items-center gap-2 text-xl">
        <span>
          <EnRedIso />
        </span>
        <span>Hablemos</span>
      </div>
    </div>
  );
}
