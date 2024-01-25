import {
  LightsparkClientProvider,
  JwtAuthProvider,
} from "@lightsparkdev/react-wallet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Redis } from "@upstash/redis";
import "@radix-ui/themes/styles.css";
import "@/styles/globals.css";

const redis = Redis.fromEnv();

export const revalidate = 10; // cache limit
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  const member = await redis.srandmember<string>("nextjs13");

  return (
    <QueryClientProvider client={queryClient}>
      <LightsparkClientProvider>
        <JwtAuthProvider>{children}</JwtAuthProvider>
      </LightsparkClientProvider>
    </QueryClientProvider>
  );
}
