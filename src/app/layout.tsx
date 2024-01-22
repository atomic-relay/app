import { LightsparkClientProvider, JwtAuthProvider } from '@lightsparkdev/react-wallet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '@radix-ui/themes/styles.css';
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      }
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <LightsparkClientProvider>
        <JwtAuthProvider>{children}</JwtAuthProvider>
      </LightsparkClientProvider>
    </QueryClientProvider>
  )
}
