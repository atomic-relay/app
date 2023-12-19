import "@/styles/globals.css";

import { ConfirmationComponent } from '@/components/ConfirmationComponent';

export default function Confirmation({
  params,
  searchParams,
}: {
	params: { slug: string }
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	// const { data, error, isLoading } = useSWR('/api/v3/orders');
	console.log(searchParams, 'SEARCH PARAMS');
	return <ConfirmationComponent searchParams={searchParams || {}} />
}
