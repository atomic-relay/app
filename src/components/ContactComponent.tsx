import React from 'react';

export default function ContactComponent(props: any) {
	const person = props.item
	return (
		<li key={person.email} className="flex justify-between gap-x-6 py-5">
			<div className="flex min-w-0 gap-x-4">
				<img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
				<div className="min-w-0 flex-auto">
					<p className="text-sm font-semibold leading-6 text-white-900">{person.name}</p>
					<p className="mt-1 truncate text-xs leading-5 text-white-900">{person.email}</p>
				</div>
			</div>
			<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
				<p className="text-sm leading-6 text-white-900">{person.role}</p>
				<div className="mt-1 flex items-center gap-x-1.5">
					<div className="flex-none rounded-full bg-emerald-500/20 p-1">
						<div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
					</div>
					<p className="text-xs leading-5 text-gray-500">Online</p>
				</div>
			</div>
		</li>
	)
}
