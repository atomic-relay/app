import { InvoiceComponent } from "@/components/pages/InvoiceComponent";
import WrapperComponent from "@/components/WrapperComponent";
import { supabase } from "@/lib/supabaseClient";

async function Invoice() {
  const { data } = await supabase.from("payments").select();
  // TODO get payemnts from the server
  return (
    <WrapperComponent>
      <InvoiceComponent serverInvoices={data || []} />
    </WrapperComponent>
  );
}

export default Invoice;
