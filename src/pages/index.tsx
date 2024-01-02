"use server"

import "@/styles/globals.css";
import useSWR from 'swr';
import { ClientComponent } from '@/components/ClientComponent';
import crypto from "crypto";
import { Bucket } from "sst/node/bucket";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function getServerSideProps() {
  // const nonce = Date.now();
  // const request = {
  //   book: 'btc_mxn', // btc_usd btc_usdt
  // }
  // const sharedSecret = nonce + 'get' + '/api/v3/orders' + JSON.stringify(request);
  // const query = "book=btc_mxn";
  // const signature = crypto.createHmac("sha256", sharedSecret).update(query).digest("hex");
  // const res = await fetch("https://api.bitso.com/api/v3/orders?" + query, {
  //   headers: {
  //     "X-Signature": signature
  //   }
  // })
  // return { props: res.json() }

  // S3 UPLOAD
  const command = new PutObjectCommand({
    ACL: "public-read",
    Key: crypto.randomUUID(),
    // @ts-ignore
    Bucket: Bucket.public.bucketName,
  });
  const url = await getSignedUrl(new S3Client({}), command);
  return { props: { url } };
}

export default async function Home() {
  // const { data, error, isLoading } = useSWR('/api/v3/orders');
  return <ClientComponent data={{}} />
}
