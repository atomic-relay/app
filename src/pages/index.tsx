import type { AppProps } from 'next/app'
import {ClientComponent} from "@/components/ClientComponent";
import NavbarComponent from "@/components/NavbarComponent";

export default function Home({ pageProps }: AppProps) {
	return (
		<>
			<NavbarComponent />
			<ClientComponent data={{}} {...pageProps} />
		</>
	)
}
