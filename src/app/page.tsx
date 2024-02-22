import { InvoiceComponent } from "@/components/pages/InvoiceComponent";
import WrapperComponent from "@/components/WrapperComponent";
import { supabase } from "@/lib/supabaseClient";
import { ClerkProvider } from "@clerk/nextjs";

async function Page() {
  const { data } = await supabase.from("payments").select();
  return (
    <WrapperComponent>
      <ClerkProvider>
        <InvoiceComponent serverInvoices={data || []} />
      </ClerkProvider>
    </WrapperComponent>
  );
}

export default Page;
