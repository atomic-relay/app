import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

/**
 * Header component with logo and navigation links.
 */
const Header = () => {
  return (
    <div className="fixed h-14 w-full bg-white border-t z-50">
      <div className="flex flex-row items-center justify-between h-full px-6">
        <Link
          href="https://www.lightspark.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            src="/lightspark_logo.svg"
            alt="Lightspark Logo"
            width={120}
            height={24}
          />
        </Link>
        <div className="flex flex-row gap-4 items-center text-sm">
          <Link
            href="https://app.lightspark.com/docs"
            rel="noopener noreferrer"
            target="_blank"
            className="no-underline"
          >
            lightspark docs
          </Link>
          <Link
            href="https://www.lightspark.com/"
            rel="noopener noreferrer"
            target="_blank"
            className="no-underline"
          >
            lightspark.com
          </Link>
          <Link
            href="https://github.com/lightsparkdev"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image src="/github.svg" alt="Github" width={16} height={16} />
          </Link>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default Header;
