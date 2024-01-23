"use client"

import type { AppProps } from 'next/app'
import { Title, Card } from "@tremor/react";
import React from "react";
import PaymentComponent from "@/components/pages/PaymentComponent";
import { supabase } from '@/lib/supabaseClient'

import {getPaymentsByUserId} from "@/queries/getPaymentsByUserId";
import useSWR from 'swr';

function usePaymentsQuery(
	paymentsId: string
) {
	const key = ['payments', '1234'];
	return useSWR(key, async () => {
		console.log('fetching payments');
		return getPaymentsByUserId(supabase, paymentsId).then(
		// @ts-ignore
			(result) => result.data
		);
	});
}


const payments = [
	{
		id: 1,
		name: 'Leslie Alexander',
		date: '2023-01-23T13:23Z',
		email: 'a@test.com',
		amount: '$1000'
	},
	{
		id: 2,
		name: 'Leslie Alexander',
		date: '2023-01-23T13:23Z',
		email: 'a@test.com',
		amount: '$1000'
	},
	{
		id: 3,
		name: 'Leslie Alexander',
		date: '2023-01-23T13:23Z',
		email: 'a@test.com',
		amount: '$1000'
	},
	{
		id: 4,
		name: 'Leslie Alexander',
		date: '2023-01-23T13:23Z',
		email: 'a@test.com',
		amount: '$1000'
	},
	{
		id: 5,
		name: 'Leslie Alexander',
		date: '2023-01-23T13:23Z',
		email: 'a@test.com',
		amount: '$1000'
	},
	{
		id: 6,
		name: 'Leslie Alexander',
		date: '2023-01-23T13:23Z',
		email: 'a@test.com',
		amount: '$1000'
	},
]
export default function Home(props: AppProps) {
	const { data: paymentsRes, error } = usePaymentsQuery('');
	console.log(paymentsRes);
	console.log(error);

	return (
		<Card className="max-w-xl my-10 mx-auto">
			<Title>Payment</Title>
			<ul role="list" className="divide-y divide-gray-100">
				{payments.map((item: any) => (
					<PaymentComponent
						item={item}
						key={item.id}
					/>
				))}
			</ul>
		</Card>
	)
}
