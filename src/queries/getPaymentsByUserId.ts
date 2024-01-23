import { SupabaseClient } from "@supabase/supabase-js";

export function getPaymentsByUserId(client: SupabaseClient, userId?: string) {
  return client.from("payments").select().eq("user_id", userId).throwOnError();
}

export function getPayments(client: SupabaseClient) {
  return client.from("payments").select().throwOnError();
}
