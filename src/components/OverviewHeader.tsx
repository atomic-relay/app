"use client";
// Generated with Ion on 2/26/2024, 3:56:07 PM
// Figma Link: https://www.figma.com/file/Qohyu8a8oaVqtDvIRuY120?node-id=2359:7072
import { GlobeSimple } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import Badge from "./ion/Badge";
type OverviewHeaderProps = {
  description?: string;
  name?: string;
  link?: string;
  className?: string;
};

function OverviewHeader({
  description = "Avatars function as personalized visual symbols, embodying users or entities within digital environments. These graphical representations are versatile, serving not only as profile pictures but also as placeholders in scenarios where actual images are not available. Their use enhances user engagement by introducing relatable imagery, making interactions within the system more human.",
  name = "Avatar",
  link = "ion.design/avatar",
  className = "",
}: OverviewHeaderProps) {
  return (
    <div className={clsx("flex-col flex gap-14 h-fit", className)}>
      <div className="w-full flex justify-between items-center gap-4">
        <a href="https://ion.design" target="_blank" rel="noopener noreferrer">
          <img
            src="/images/welcome/Logo.svg"
            alt="Logo"
            className="w-12 h-[48px]"
          />
        </a>
        <div className="flex justify-end items-center gap-1">
          <GlobeSimple size={16} weight={"regular"} />
          <a
            href={"https://docs.ion.design"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-right text-gray-800"
          >
            {link}
          </a>
        </div>
      </div>
      <div className="w-full flex-col flex gap-6">
        <div className="w-full flex-col flex gap-3">
          <Badge emphasis="low" color="grey">
            ION DESIGN SYSTEM
          </Badge>
          <div className="text-6xl leading-[72px] font-medium text-gray-800 max-w-[750px]">
            {name}
          </div>
        </div>
        <div className="text-lg text-gray-800 max-w-[750px]">{description}</div>
      </div>
    </div>
  );
}
export default OverviewHeader;
