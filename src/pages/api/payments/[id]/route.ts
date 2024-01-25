import { getPaymentsByUserId } from "@/queries/getPaymentsByUserId";
import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { data } = await getPaymentsByUserId(supabase, params.id);
  return NextResponse.json(data);
};
