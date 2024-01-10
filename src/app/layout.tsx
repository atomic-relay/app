import { LightsparkClientProvider, JwtAuthProvider } from '@lightsparkdev/react-wallet';
import '@radix-ui/themes/styles.css';
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LightsparkClientProvider>
      <JwtAuthProvider>{children}</JwtAuthProvider>
    </LightsparkClientProvider>
  )
}
