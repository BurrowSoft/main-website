import { BurrowSoftIcon } from "@burrowsoft/shared";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4" aria-busy="true">
      <BurrowSoftIcon className="h-[72px] w-[72px] animate-pulse text-indigo-600" />
    </div>
  );
}
