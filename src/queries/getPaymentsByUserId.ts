import { SupabaseClient } from "@supabase/supabase-js";

export function getPaymentsByUserId(
	client: SupabaseClient,
	userId?: string
) {
	return client
		.from('payments')
		.select(`id`)
		// .eq('user_id', userId)
		.throwOnError()
		.single();
}
