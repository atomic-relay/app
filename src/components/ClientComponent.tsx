"use client"
import 'react-phone-number-input/style.css'
import {Button, Card, Divider, Flex, Metric, NumberInput, Text, TextInput} from "@tremor/react";
import { CurrencyDollarIcon, PhoneIcon, MailIcon } from "@heroicons/react/outline";
import {ReactElement, useState, useEffect} from "react";
import { Money } from 'ts-money'
import { useRouter } from 'next/router'
import { Select, SelectItem } from "@tremor/react";

interface ClientProps {
	data?: any;
}
export function ClientComponent(props: ClientProps): ReactElement {
	const router = useRouter();
	const [dollar, setDollars] = useState(0);
	const [btc, setBTC] = useState(0);
	const [euro, setEuros] = useState(0);
	const [stables, setStables] = useState(0);
	const [mxn, setPesos] = useState(0);
	const [fee, setFee] = useState(0);
	const [currency, setCurrency] = useState('usd');
	const [phone, setPhone] = useState();

	const btcDollarRate = 0.000022;
	const fixedFee = .01;
	useEffect(() => {
		if (dollar) {
			const dollarMoney = new Money(dollar * 100, 'USD')
			setEuros(Math.round(dollarMoney.amount * 1.1 / 100));
			setStables(dollarMoney.amount * 0.999 / 100);
			setPesos(Math.round(dollarMoney.amount * 16.91 / 100));
			setBTC(dollarMoney.amount * btcDollarRate / 100);
			setFee(dollarMoney.amount * fixedFee / 100);
		}
	}, [dollar]);

	const query = `usd=${dollar}&eur=${euro}`;
	const usFormat = new Intl.NumberFormat('en-US');
	return (
		<main className="flex min-h-screen flex-col items-center justify-self-start p-24">
			<Card className="max-w-sm my-4 mx-auto">
				<NumberInput className="my-2" icon={CurrencyDollarIcon} onValueChange={(val => setDollars(val))} placeholder="Send.." enableStepper={false} />
				<Divider />
				<Flex className="mt-2">
					<Text className="text-base">$USD</Text>
					<Metric className="text-base">${usFormat.format(dollar)}</Metric>
				</Flex>
				<Flex className="mt-2">
					<Text className="text-base">USDT</Text>
					<Metric className="text-base">${usFormat.format(stables)}</Metric>
				</Flex>
				<Flex className="mt-2">
					<Text className="text-base">USDC</Text>
					<Metric className="text-base">${usFormat.format(stables)}</Metric>
				</Flex>
				<Flex className="mt-2">
					<Text className="text-base">€EUR</Text>
					<Metric className="text-base">€{usFormat.format(euro)}</Metric>
				</Flex>
				<Flex className="mt-2">
					<Text className="text-base">₱MXN</Text>
					<Metric className="text-base">₱{usFormat.format(mxn)}</Metric>
				</Flex>
				<Flex className="mt-2">
					<Text className="text-base">₿TC</Text>
					<Metric className="text-base">₿{usFormat.format(btc)}</Metric>
				</Flex>
				<Divider />
				<div className="max-w-sm mx-auto space-y-6">
					<Select value={currency} onValueChange={setCurrency}>
						<SelectItem value="usd" icon={CurrencyDollarIcon}>
							Dollars
						</SelectItem>
						<SelectItem value="usdc" icon={CurrencyDollarIcon}>
							USDC
						</SelectItem>
						<SelectItem value="usdt" icon={CurrencyDollarIcon}>
							USDT
						</SelectItem>
						<SelectItem value="eur" icon={CurrencyDollarIcon}>
							Euros
						</SelectItem>
						<SelectItem value="mxn" icon={CurrencyDollarIcon}>
							Pesos
						</SelectItem>
						<SelectItem value="btc" icon={CurrencyDollarIcon}>
							Bitcoins
						</SelectItem>
					</Select>
				</div>
				<TextInput icon={MailIcon} className="my-2" error={false} placeholder="Email..." />
				<NumberInput icon={PhoneIcon} placeholder="+18001234" enableStepper={false} />
				<Divider />
				<Button className="max-w-lg my-2" onClick={() => router.push('/confirmation?' + query)}>Submit</Button>
				<Flex className="mt-4">
					<Text>1% fee estimate {fee > 0 && `$`}{fee > 0 && fee}</Text>
					<Text>Delivery 1 hr</Text>
				</Flex>
			</Card>
		</main>
	)
}
