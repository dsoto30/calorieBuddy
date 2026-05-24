import Image from "next/image";
import logo from "@/public/logo.svg";

/**
 * BrandIcon — the Calorie Buddy logo (heart + cross).
 * Pass a `size` prop (defaults to 24) to control pixel dimensions.
 * Renders /public/logo.svg via next/image using a plain public path.
 */
export default function BrandIcon({ size = 24 }: { size?: number }) {
  return (
    <Image
      src={logo}
      alt="Calorie Buddy logo"
      width={size}
      height={size}
      loading="eager"
    />
  );
}
