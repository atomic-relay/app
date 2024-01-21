import React from 'react';

export default function PaymentComponent(props: any) {
	const payment = props.item
	return (
		<li key={payment.id} className="flex justify-between gap-x-6 py-5">
			<div className="flex min-w-0 gap-x-4">
				<div className="min-w-0 flex-auto">
					<p className="text-sm font-semibold leading-6 text-white-900">{payment.name}</p>
					<p className="mt-1 truncate text-xs leading-5 text-white-900">{payment.date}</p>
				</div>
			</div>
			<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
				<div className="min-w-0 flex-auto">
					<p className="text-sm font-semibold leading-6 text-white-900">{payment.email}</p>
					<p className="text-sm font-semibold leading-6 text-white-900">{payment.amount}</p>
				</div>
			</div>
		</li>
	)
}
