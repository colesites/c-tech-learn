"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  textClassName?: string;
}

const Logo = ({ className, textClassName }: LogoProps) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Image
        src="/logo-blue.svg"
        alt="Learn logo"
        width={26}
        height={26}
        preload={true}
        className="dark:hidden md:size-8"
      />
      <Image
        src="/logo-white.svg"
        alt="Learn logo"
        width={26}
        height={26}
        preload={true}
        className="hidden dark:block md:size-8"
      />
      <p className={cn("text-2xl font-medium md:font-bold", textClassName)}>
        Learn
      </p>
    </Link>
  );
};

export default Logo;
