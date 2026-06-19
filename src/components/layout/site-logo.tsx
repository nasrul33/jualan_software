import Image from "next/image";
import Link from "next/link";

export function SiteLogo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center rounded-md"
      aria-label="PDAMCore beranda"
    >
      <Image
        src="/images/logo-pdamcore.svg"
        alt="PDAMCore"
        width={220}
        height={48}
        priority
        className="h-10 w-auto"
      />
    </Link>
  );
}
