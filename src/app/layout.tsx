import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import EnvironmentSettingsProvider from "@/providers/EnvironmentSettingsProvider";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <EnvironmentSettingsProvider>
        <UserProvider>
          <ClerkProvider>{children}</ClerkProvider>
        </UserProvider>
      </EnvironmentSettingsProvider>
    </html>
  );
}
