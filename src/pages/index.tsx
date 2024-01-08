// "use server"

import "@/styles/globals.css";
import { ClientComponent } from '@/components/ClientComponent';
import { useEffect } from 'react'
import io from 'Socket.IO-client'
import SocketHandler from '../pages/api/socket';
import crypto from "crypto";

// export async function getServerSideProps() {
//   // const nonce = Date.now();
//   // const request = {
//   //   book: 'btc_mxn', // btc_usd btc_usdt
//   // }
//   // const sharedSecret = nonce + 'get' + '/api/v3/orders' + JSON.stringify(request);
//   // const query = "book=btc_mxn";
//   // const signature = crypto.createHmac("sha256", sharedSecret).update(query).digest("hex");
//   // const res = await fetch("https://api.bitso.com/api/v3/orders?" + query, {
//   //   headers: {
//   //     "X-Signature": signature
//   //   }
//   // })
//   // return { props: res.json() }
// }

export default async function Home() {
  // const { data, error, isLoading } = useSWR('/api/v3/orders');
  // @ts-ignore
  let socket;
  // @ts-ignore
  // useEffect(() => socketInitializer(), [])

  // const socketInitializer = async () => {
  //   await fetch('wss://ws-feed-public.sandbox.exchange.coinbase.com')
  //   socket = io()
  //   socket.on('connect', () => {
  //     // @ts-ignore
  //     socket.on('input-change', () => {
  //       // @ts-ignore
  //       socket.broadcast.emit('subscribe', {
  //         "type": "subscribe",
  //         "product_ids": [
  //           "BTC-USD",
  //         ],
  //         "channels": [
  //           "level2",
  //           "heartbeat",
  //           {
  //             "name": "ticker",
  //             "product_ids": [
  //               "BTC-USD",
  //             ]
  //           }
  //         ]
  //       })
  //     })
  //     console.log('connected')
  //   })
  //
  // }

  return <ClientComponent data={{}} />
}
