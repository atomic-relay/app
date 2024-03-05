"use client";

import NavbarComponent from "@/components/library/NavbarComponent";
import FooterComponent from "@/components/library/FooterComponent";
export default function Page({ children }: any) {
  return (
    <div>
      <NavbarComponent />
      <div className="min-h-screen">
        <main className="flex min-h-screen flex-col items-center justify-self-start p-24">
          {children}
        </main>
      </div>
      <FooterComponent />
    </div>
  );
}
