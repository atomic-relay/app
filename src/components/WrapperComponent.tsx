"use client";

import NavbarComponent from "@/components/library/NavbarComponent";
import FooterComponent from "@/components/library/FooterComponent";
export default function Page({ children }: any) {
  return (
    <div>
      <NavbarComponent />
      <div className="min-h-screen">{children}</div>
      <FooterComponent />
    </div>
  );
}
