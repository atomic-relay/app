import "@/styles/globals.css";
import crypto from 'crypto';
import useSWR from 'swr';
import { ClientComponent } from '@/components/ClientComponent';

export async function getServerSideProps() {
  const nonce = Date.now();
  const request = {
    book: 'btc_mxn', // btc_usd btc_usdt
  }
  const sharedSecret = nonce + 'get' + '/api/v3/orders' + JSON.stringify(request);
  const query = "book=btc_mxn";
  const signature = crypto.createHmac("sha256", sharedSecret).update(query).digest("hex");
  const res = await fetch("https://api.bitso.com/api/v3/orders?" + query, {
    headers: {
      "X-Signature": signature
    }
  })
  return { props: res.json() }
}

export default function Home() {
  const { data, error, isLoading } = useSWR('/api/v3/orders');
  return <ClientComponent data={data} />
}
