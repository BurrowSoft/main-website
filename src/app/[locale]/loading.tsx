import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4" aria-busy="true">
      <Image
        src="/brand/logo-header.png"
        alt="BurrowSoft"
        width={357}
        height={83}
        priority
        className="h-14 w-auto animate-pulse"
      />
    </div>
  );
}
