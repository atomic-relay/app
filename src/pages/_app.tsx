import type { AppProps } from 'next/app'
import { ClientComponent } from '@/components/ClientComponent';
import '@radix-ui/themes/styles.css';
import "@/styles/globals.css";

export default function Home({ pageProps }: AppProps) {
	return (
		<ClientComponent data={{}} {...pageProps} />
	)
}
