"use client";

import "react-phone-number-input/style.css";
import {
  Button,
  Card,
  Divider,
  Flex,
  Metric,
  NumberInput,
  Text,
  TextInput,
} from "@tremor/react";
import { useApiRequest } from "@/hooks/useApiRequest";
import { CurrencyDollarIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { ReactElement, useState, useEffect } from "react";
import { Money } from "ts-money";
import { Select, SelectItem } from "@tremor/react";
import { supabase } from "@/lib/supabaseClient";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface ClientProps {
  serverInvoices: any[];
}

// @ts-ignore
async function sendCurrRequest(url, { arg }) {
  return fetch(url, {
    headers: {
      "x-api-key": `${process.env.NEXT_LIVECOIN_WATCH_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

const fetchData = async () => {
  const { data, error } = await supabase.from("payments").select();
  console.log(data);
};

export function InvoiceComponent(props: ClientProps): ReactElement {
  const [invoices, setInvoices] = useState<any[]>([]);

  const [dollar, setDollars] = useState(1);
  const [sats, setSATS] = useState(0);
  const [stables, setStables] = useState(0);
  const [mxn, setPesos] = useState(0);
  const [fee, setFee] = useState(0);
  const [currency, setCurrency] = useState("usdt");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const btcDollarRate = 0.000024;
  const fixedFee = 0.01;
  // const { trigger, data } = useSWRMutation(
  //   "https://api.livecoinwatch.com/coins/list",
  //   sendCurrRequest,
  // );

  // const [fetchData, { data, loading, error }] = useApiRequest<[]>(
  //   `/api/hello`,
  // `GET`,
  // );
  //
  // useEffect(() => {
  //   void fetchData();
  // }, []);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "payments" },
        (payload: any) =>
          setInvoices((prevInvoices: any) => [...prevInvoices, payload.new]),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [invoices]);

  useEffect(() => {
    fetchData().then((r) => console.log(r));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // trigger({
    //   currency: "USD",
    //   sort: "rank",
    //   order: "ascending",
    //   offset: 0,
    //   limit: 2,
    //   meta: false,
    // });
  }, []);

  useEffect(() => {
    if (dollar) {
      const dollarMoney = new Money(dollar * 100, "USD");
      setStables(dollarMoney.amount / 100);
      setPesos(Math.round((dollarMoney.amount * 16.91) / 100));
      setSATS(((dollarMoney.amount * btcDollarRate) / 100) * 1000000000);
      setFee((dollarMoney.amount * fixedFee) / 100);
    }
  }, [dollar]);

  useEffect(() => {
    // toast.success("Success Notification !", {
    //   position: "top-right",
    // });
  }, []);

  const query = `usd=${dollar}&mxn=${mxn}`;
  const usFormat = new Intl.NumberFormat("en-US");

  return (
    <main className="flex min-h-screen flex-col items-center justify-self-start p-24">
      {/*<ToastContainer />*/}
      <Card className="max-w-sm my-4 mx-auto">
        <Flex className="mt-2">
          <Text className="text-base">USD (USDT/USDC)</Text>
          <Metric className="text-base">${usFormat.format(stables)}</Metric>
        </Flex>
        <Flex className="mt-2">
          <Text className="text-base">MXN</Text>
          <Metric className="text-base">${usFormat.format(mxn)}</Metric>
        </Flex>
        <Flex className="mt-2">
          <Text className="text-base">SATS</Text>
          <Metric className="text-base">{usFormat.format(sats)}</Metric>
        </Flex>
        <Divider />
        <div className="max-w-sm mx-auto space-y-6">
          <Select value={currency} onValueChange={setCurrency}>
            <SelectItem value="usdt" icon={CurrencyDollarIcon}>
              USD
            </SelectItem>
            <SelectItem value="mxn" icon={CurrencyDollarIcon}>
              MXN
            </SelectItem>
            <SelectItem value="sats" icon={CurrencyDollarIcon}>
              SATS
            </SelectItem>
          </Select>
        </div>
        <NumberInput
          className="my-2"
          icon={CurrencyDollarIcon}
          onValueChange={(val) => setDollars(val)}
          placeholder="Send.."
          enableStepper={false}
        />
        <TextInput
          className="my-2"
          error={false}
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <NumberInput
          icon={PhoneIcon}
          placeholder="+18001234"
          enableStepper={false}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Divider />
        <Link
          href={"confirmation?" + query + `&phone=${phone}` + `&email=${email}`}
        >
          <Button className="max-w-lg my-2">Submit</Button>
        </Link>
        <Flex className="mt-4">
          <Text>
            Fee: {fee > 0 && `$`}
            {fee > 0 && fee} {fee <= 0 && `1% fee estimate`}
          </Text>
          <Text>Delivery Estimate: 1 hr</Text>
        </Flex>
      </Card>
    </main>
  );
}
