import type { AppProps } from "next/app";
import { InvoiceComponent } from "@/components/pages/InvoiceComponent";
export default function Home({ pageProps }: AppProps) {
  return <InvoiceComponent data={{}} {...pageProps} />;
}
