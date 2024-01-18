import type { AppProps } from 'next/app'
import {ClientComponent} from "@/components/ClientComponent";
import {ClerkProvider, UserButton} from '@clerk/nextjs';

export default function Home({ pageProps }: AppProps) {
	return (
		<ClerkProvider {...pageProps}>
			<div>
				<p>Hello @username</p>
				<UserButton afterSignOutUrl="/loggedout"/>
			</div>
			<ClientComponent data={{}} {...pageProps} />
		</ClerkProvider>
	)
}
