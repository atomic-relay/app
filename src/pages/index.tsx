import type { AppProps } from 'next/app'
import {ClerkProvider, UserButton} from '@clerk/nextjs';

export default function Home({ pageProps }: AppProps) {
	return (
		<ClerkProvider {...pageProps}>
			<UserButton afterSignOutUrl="/loggedout"/>
		</ClerkProvider>
	)
}
