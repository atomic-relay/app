"use client"

import type { AppProps } from 'next/app'
import { ClerkProvider } from '@clerk/nextjs';
import '@radix-ui/themes/styles.css';
import "@/styles/globals.css";
import NavbarComponent from "../components/library/NavbarComponent";
import FooterComponent from "../components/library/FooterComponent";

export default function Home({ Component, pageProps }: AppProps) {
	//  TODO add is logged in / logged out logic
	// Allow for sidebar taiilwind UI for logged in
	// Allow for top nav footer nav for logged out state
	return (
		<ClerkProvider {...pageProps}>
			<NavbarComponent />
			<Component {...pageProps} />
			<FooterComponent />
		</ClerkProvider>
	)
}
