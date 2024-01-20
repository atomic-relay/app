import type { AppProps } from 'next/app'
import {ClientComponent} from "@/components/ClientComponent";
import {ClerkProvider, UserButton} from '@clerk/nextjs';

export default function Home({ pageProps }: AppProps) {
	return (
		<ClientComponent data={{}} {...pageProps} />
	)
}
//
// // <ClerkProvider {...pageProps}>
// // 	<div>
// {/*<p>Hello @username</p>*/}
// {/*<UserButton afterSignOutUrl="/loggedout"/>*/}
// {/*</div>*/}
// // </ClerkProvider>
