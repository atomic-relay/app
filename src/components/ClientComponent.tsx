"use client"

import {AreaChart, Button, Card, Flex, Icon, Metric, NumberInput, Text, Title} from "@tremor/react";
import {ArrowCircleDownIcon, CurrencyDollarIcon } from "@heroicons/react/outline";
import {ReactElement, useState, useEffect} from "react";
import { Money } from 'ts-money'
import { useRouter } from 'next/router'

const chartdata = [
	{
		date: "Jan 2023",
		USD: 18000,
		SATS: 100000,
	},
	{
		date: "Feb 2023",
		USD: 20000,
		SATS: 100000,
	},
	{
		date: "Mar 2023",
		USD: 26000,
		SATS: 100000,
	},
	{
		date: "Apr 2023",
		USD: 22500,
		SATS: 100000,
	},
	{
		date: "May 2023",
		USD: 30000,
		SATS: 100000,
	},
	{
		date: "Jun 2023",
		USD: 35000,
		SATS: 100000,
	},
];

const valueFormatter = function(number: number) {
	return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

interface ClientProps {
	data?: any;
}
export function ClientComponent(props: ClientProps): ReactElement {
	const data = props.data;
	console.log(data, 'DATA');
	const router = useRouter();
	const [dollar, setDollars] = useState(0);
	const [euro, setEuros] = useState(0);
	const exchangeRate = 1.1;
	useEffect(() => {
		if (dollar) {
			const dollarMoney = new Money(dollar * 100, 'USD')
			setEuros(Math.round(dollarMoney.amount * exchangeRate / 100));
		}
	}, [dollar]);

	const query = `usd=${dollar}&eur=${euro}`;

	return (
		<main className="flex min-h-screen flex-col items-center justify-self-start p-24">
			<Card className="max-w-xs my-4 mx-auto">
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
				<Button className="my-2" onClick={() => router.push('/confirmation?' + query)}>Submit</Button>
				<Flex className="mt-4">
					<Text>1% fee</Text>
					<Text>Delivery 1 hr</Text>
				</Flex>
			</Card>
			<Card>
				<Title>Price Over Time</Title>
				<AreaChart
					className="h-72 mt-2"
					data={chartdata}
					index="date"
					categories={["USD", "SATS"]}
					colors={["green", "red"]}
					valueFormatter={valueFormatter}
				/>
			</Card>
		</main>
	)
}
