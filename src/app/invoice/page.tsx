import { InvoiceComponent } from "@/components/pages/InvoiceComponent";
import WrapperComponent from "@/components/WrapperComponent";
import { supabase } from "@/lib/supabaseClient";

async function Invoice() {
  const { data } = await supabase.from("payments").select();
  return (
    <WrapperComponent>
      <InvoiceComponent serverInvoices={data || []} />
    </WrapperComponent>
  );
}

export default Invoice;
