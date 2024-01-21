"use client"
import "@/styles/globals.css";
import { ConfirmationComponent } from '@/components/ConfirmationComponent';
import {Card} from "@tremor/react";
export default function Confirmation({
  params,
  searchParams,
}: {
	params: { slug: string }
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	// const { data, error, isLoading } = useSWR('/api/v3/orders');
	console.log(searchParams, 'SEARCH PARAMS');
	return (
		<Card className="max-w-md my-4 mx-auto">
				<ConfirmationComponent searchParams={searchParams || {}} />
		</Card>
	)
}
