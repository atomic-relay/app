"use client"

import type { AppProps } from 'next/app'
import { ClerkProvider } from '@clerk/nextjs';
import '@radix-ui/themes/styles.css';
import "@/styles/globals.css";
import NavbarComponent from "../components/library/NavbarComponent";
import FooterComponent from "../components/library/FooterComponent";


// LAYOUT PAGE
export default function Home({ Component, pageProps }: AppProps) {
	return (
		<ClerkProvider {...pageProps}>
			<NavbarComponent />
			<Component {...pageProps} />
			<FooterComponent />
		</ClerkProvider>
	)
}
