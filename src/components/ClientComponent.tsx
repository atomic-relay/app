"use client"

import { Button, Card, Flex, Icon, Metric, NumberInput, Text } from "@tremor/react";
import {ArrowCircleDownIcon, CurrencyDollarIcon } from "@heroicons/react/outline";
import {ReactElement, useState, useEffect} from "react";
import { Money } from 'ts-money'
import { useRouter } from 'next/router'
import { TextInput } from "@tremor/react";

interface ClientProps {
	data?: any;
}
export function ClientComponent(props: ClientProps): ReactElement {
	const data = props.data;
	console.log(data, 'DATA');
	const router = useRouter();
	const [dollar, setDollars] = useState(0);
	const [euro, setEuros] = useState(0);
	const [fee, setFee] = useState(0);
	const exchangeRate = 1.1;
	const fixedFee = .01;
	useEffect(() => {
		if (dollar) {
			const dollarMoney = new Money(dollar * 100, 'USD')
			setEuros(Math.round(dollarMoney.amount * exchangeRate / 100));
			setFee(dollarMoney.amount * fixedFee / 100);
		}
	}, [dollar]);

	const query = `usd=${dollar}&eur=${euro}`;

	return (
		<main className="flex min-h-screen flex-col items-center justify-self-start p-24">
			<Card className="max-w-sm my-4 mx-auto">
				<NumberInput className="my-2" icon={CurrencyDollarIcon} onValueChange={(val => setDollars(val))} placeholder="Send.." />
				<Flex className="mt-2">
					<Text>$USD Exchange Rate</Text>
					<Metric className="text-base">${dollar}</Metric>
				</Flex>
				<Flex className="mt-2 mx-auto">
					<Icon className="w-8 h-8 text-center" icon={ArrowCircleDownIcon} />
				</Flex>
				<Flex className="mt-2">
					<Text>$EUR Exchange Rate</Text>
					<Metric className="text-base">${euro}</Metric>
				</Flex>
				<TextInput className="my-2" error={false} placeholder="Email..." />
				<Button className="max-w-lg my-2" onClick={() => router.push('/confirmation?' + query)}>Submit</Button>
				<Flex className="mt-4">
					<Text>1% fee estimate {fee > 0 && `$`}{fee > 0 && fee}</Text>
					<Text>Delivery 1 hr</Text>
				</Flex>
			</Card>

		</main>
	)
}
