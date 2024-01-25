"use client";

import NavbarComponent from "@/components/library/NavbarComponent";
import FooterComponent from "@/components/library/FooterComponent";
export default function Page({ children }: any) {
  return (
    <div>
      <NavbarComponent />
      {children}
      <FooterComponent />
    </div>
  );
}
