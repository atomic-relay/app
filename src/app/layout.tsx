import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@radix-ui/themes/styles.css';
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
          {children}
        </body>
      </Theme>
    </html>
  )
}
