"use client"
import 'react-phone-number-input/style.css'
import { Button, Card, Divider, Flex, Metric, NumberInput, Text, TextInput } from "@tremor/react";
import { CurrencyDollarIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { ReactElement, useState, useEffect } from "react";
import { Money } from 'ts-money'
import { useRouter } from 'next/router'
import { Select, SelectItem } from "@tremor/react";
import useSWRMutation from 'swr/mutation'

interface ClientProps {
	data?: any;
}

// @ts-ignore
async function sendRequest(url, { arg }) {
	return fetch(url, {
		headers: {
			"x-api-key": "14a8c514-260e-4cd4-8f70-6c1b26912f0e",
		},
		method: 'POST',
		body: JSON.stringify(arg)
	}).then(res => res.json())
}

export function ClientComponent(props: ClientProps): ReactElement {
	const router = useRouter();
	const [dollar, setDollars] = useState(1);
	const [sats, setSATS] = useState(0);
	const [stables, setStables] = useState(0);
	const [mxn, setPesos] = useState(0);
	const [fee, setFee] = useState(0);
	const [currency, setCurrency] = useState('usdt');
	const [phone, setPhone] = useState<string>('');
	const [email, setEmail] = useState<string>('');

	const btcDollarRate= 0.000024;
	const fixedFee = .01;
	const { trigger, data } = useSWRMutation('https://api.livecoinwatch.com/coins/list', sendRequest)

	useEffect(() => {
		// @ts-ignore
		// eslint-disable-next-line react-hooks/rules-of-hooks
		trigger({
			currency: "USD",
			sort: "rank",
			order: "ascending",
			offset: 0,
			limit: 2,
			meta: false,
		});
	}, []);
	useEffect(() => {
		if (dollar) {
			const dollarMoney = new Money(dollar * 100, 'USD')
			setStables(dollarMoney.amount * 1 / 100);
			setPesos(Math.round(dollarMoney.amount * 16.91 / 100));
			setSATS(dollarMoney.amount * btcDollarRate / 100 * 1000000000);
			setFee(dollarMoney.amount * fixedFee / 100);
		}
	}, [dollar]);

	const query = `usd=${dollar}&mxn=${mxn}`;
	const usFormat = new Intl.NumberFormat('en-US');

	return (
		<main className="flex min-h-screen flex-col items-center justify-self-start p-24">
			<Card className="max-w-sm my-4 mx-auto">
				<Flex className="mt-2">
					<Text className="text-base">USD (USDT/USDC)</Text>
					<Metric className="text-base">${usFormat.format(stables)}</Metric>
				</Flex>
				<Flex className="mt-2">
					<Text className="text-base">MXN</Text>
					<Metric className="text-base">${usFormat.format(mxn)}</Metric>
				</Flex>
				<Flex className="mt-2">
					<Text className="text-base">SATS</Text>
					<Metric className="text-base">{sats}</Metric>
				</Flex>
				<Divider />
				<div className="max-w-sm mx-auto space-y-6">
					<Select value={currency} onValueChange={setCurrency}>
						<SelectItem value="usdt" icon={CurrencyDollarIcon}>
							USDT
						</SelectItem>
						<SelectItem value="mxn" icon={CurrencyDollarIcon}>
							MXN
						</SelectItem>
						<SelectItem value="sats" icon={CurrencyDollarIcon}>
							SATS
						</SelectItem>
					</Select>
				</div>
				<NumberInput className="my-2" icon={CurrencyDollarIcon} onValueChange={(val => setDollars(val))} placeholder="Send.." enableStepper={false} />
				<TextInput className="my-2" error={false} placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
				<NumberInput icon={PhoneIcon} placeholder="+18001234" enableStepper={false} onChange={(e) => setPhone(e.target.value)} />
				<Divider />
				<Button className="max-w-lg my-2" onClick={() => router.push('/confirmation?' + query + `&phone=${phone}` + `&email=${email}`)}>Submit</Button>
				<Flex className="mt-4">
					<Text>Fee: {fee > 0 && `$`}{fee > 0 && fee} { fee <= 0 && `1% fee estimate`}</Text>
					<Text>Delivery Estimate: 1 hr</Text>
				</Flex>
			</Card>
		</main>
	)
}
