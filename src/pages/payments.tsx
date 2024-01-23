"use client";

import type { AppProps } from "next/app";
import { Title, Card } from "@tremor/react";
import React, { useState, useEffect } from "react";
import PaymentComponent from "@/components/pages/PaymentComponent";
import { supabase } from "@/lib/supabaseClient";

import { getPayments } from "@/queries/getPaymentsByUserId";
import useSWR from "swr";
import LoadingComponent from "@/components/library/LoadingComponent";

function usePaymentsQuery(paymentsId: string) {
  const key = ["payments", "1234"];
  return useSWR(key, async () => {
    return getPayments(supabase).then((result) => result.data);
  });
}

const payments = [
  {
    id: 1,
    name: "Leslie Alexander",
    date: "2023-01-23T13:23Z",
    email: "a@test.com",
    amount: "$1000",
  },
  {
    id: 2,
    name: "Leslie Alexander",
    date: "2023-01-23T13:23Z",
    email: "a@test.com",
    amount: "$1000",
  },
  {
    id: 3,
    name: "Leslie Alexander",
    date: "2023-01-23T13:23Z",
    email: "a@test.com",
    amount: "$1000",
  },
  {
    id: 4,
    name: "Leslie Alexander",
    date: "2023-01-23T13:23Z",
    email: "a@test.com",
    amount: "$1000",
  },
  {
    id: 5,
    name: "Leslie Alexander",
    date: "2023-01-23T13:23Z",
    email: "a@test.com",
    amount: "$1000",
  },
  {
    id: 6,
    name: "Leslie Alexander",
    date: "2023-01-23T13:23Z",
    email: "a@test.com",
    amount: "$1000",
  },
];
export default function Home(props: AppProps) {
  const res = usePaymentsQuery("");
  const [response, setResponse] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (res.data) {
      setTimeout(() => {
        setLoading(false);
      }, 300);
      setResponse(res.data as any[]);
    }
  }, [res.data]);

  return (
    <Card className="max-w-xl my-10 mx-auto">
      <Title>Payment</Title>
      <ul role="list" className="divide-y divide-gray-100">
        {loading ? (
          <div className="flex justify-between gap-x-6 py-5">
            <LoadingComponent />
          </div>
        ) : (
          <div>
            {(response.length > 0 ? response : payments).map((item: any) => (
              <PaymentComponent item={item} key={item.id} />
            ))}
          </div>
        )}
      </ul>
    </Card>
  );
}
