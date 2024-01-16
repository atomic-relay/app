import type { AppProps } from 'next/app'
import { ClientComponent } from '@/components/ClientComponent';
import { ClerkProvider } from '@clerk/nextjs';

export default function Home({ pageProps }: AppProps) {
	return (
		<ClerkProvider {...pageProps}>
			<ClientComponent data={{}} {...pageProps} />
		</ClerkProvider>
	)
}
