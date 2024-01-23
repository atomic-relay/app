import type { AppProps } from "next/app";
import { ClientComponent } from "@/components/pages/ClientComponent";
export default function Home({ pageProps }: AppProps) {
  return <ClientComponent data={{}} {...pageProps} />;
}
