"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function RealtimeInvoices({
  serverInvoices,
}: {
  serverInvoices: any;
}) {
  const [invoices, setInvoices] = useState(serverInvoices);

  useEffect(() => {
    setInvoices(serverInvoices);
  }, [serverInvoices]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "payments" },
        (payload: any) =>
          setInvoices((invoices: any) => [...invoices, payload.new]),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverInvoices]);

  return <pre>{JSON.stringify(invoices, null, 2)}</pre>;
}
