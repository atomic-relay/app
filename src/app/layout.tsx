import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@radix-ui/themes/styles.css';
import "@/styles/globals.css";
import { LightsparkClientProvider, JwtAuthProvider } from '@lightsparkdev/react-wallet';
import { Theme } from '@radix-ui/themes';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Atomic Relay',
  description: 'Atomic Relay',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Theme accentColor="crimson" grayColor="sand" radius="large" >
        <body className={inter.className}>
          <LightsparkClientProvider>
            <JwtAuthProvider>{children}</JwtAuthProvider>
          </LightsparkClientProvider>
        </body>
      </Theme>
    </html>
  )
}
