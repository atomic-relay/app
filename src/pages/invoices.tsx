import type { AppProps } from 'next/app'
import {ClientComponent} from "@/components/ClientComponent";
import { Title, Subtitle, Flex, Card } from "@tremor/react";


export default function Home({ pageProps }: AppProps) {
	return (
		<Card className="max-w-xl my-10 mx-auto">
			<Title>Invoice</Title>
			<Subtitle>Invoice #123</Subtitle>
			<ClientComponent data={{}} {...pageProps} />
		</Card>
	)
}
