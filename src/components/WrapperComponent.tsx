"use client";

import NavbarComponent from "@/components/library/NavbarComponent";
import FooterComponent from "@/components/library/FooterComponent";
export default function Page({ children }: any) {
  return (
    <div>
      <NavbarComponent />
      <main className="min-h-screen flex flex-col justify-self-start mt-12">
        {children}
      </main>
      <FooterComponent />
    </div>
  );
}
