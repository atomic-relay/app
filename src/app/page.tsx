import { InvoiceComponent } from "@/components/pages/InvoiceComponent";
import WrapperComponent from "@/components/WrapperComponent";
import { supabase } from "@/lib/supabaseClient";
import { UserProvider } from "@auth0/nextjs-auth0";

async function Page() {
  const { data } = await supabase.from("payments").select();
  return (
    <UserProvider>
      <WrapperComponent>
        <InvoiceComponent serverInvoices={data || []} />
      </WrapperComponent>
    </UserProvider>
  );
}

export default Page;
