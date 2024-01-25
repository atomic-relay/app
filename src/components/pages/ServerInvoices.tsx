import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";

export default async function ServerInvoices({
  setInvoices,
}: {
  setInvoices: any;
}) {
  const { data: serverInvoices = [] } = await supabase
    .from("posts")
    .select("*");
  useEffect(() => {
    setInvoices(serverInvoices);
  }, []);

  return <pre></pre>;
}
