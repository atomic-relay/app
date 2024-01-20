"use client"

import type { AppProps } from 'next/app'
import '@radix-ui/themes/styles.css';
import "@/styles/globals.css";
import NavbarComponent from "@/components/NavbarComponent";
import FooterComponent from "@/components/FooterComponent";
import {ClerkProvider, UserButton} from '@clerk/nextjs';


// LAYOUT PAGE
export default function Home({ Component, pageProps }: AppProps) {
	return (
		<ClerkProvider {...pageProps}>
			<NavbarComponent />
			<UserButton afterSignOutUrl="/loggedout"/>
			<Component {...pageProps} />
			<FooterComponent />
		</ClerkProvider>
	)
}
