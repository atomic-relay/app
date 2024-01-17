"use client"

import type { AppProps } from 'next/app'
import { ClientComponent } from '@/components/ClientComponent';
import '@radix-ui/themes/styles.css';
import "@/styles/globals.css";
import {ClerkProvider, UserButton} from '@clerk/nextjs';

export default function Home({ pageProps }: AppProps) {
	return (
		<ClerkProvider {...pageProps}>
			<div>
				<UserButton afterSignOutUrl="/loggedout"/>
			</div>
			<ClientComponent data={{}} {...pageProps} />
		</ClerkProvider>
	)
}
