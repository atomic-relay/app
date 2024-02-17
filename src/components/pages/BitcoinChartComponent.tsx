"use client";
import {
  AreaChart,
  Card,
  Title,
  Text,
  TextInput,
  Divider,
} from "@tremor/react";
import { ReactElement, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const chartData = [
  {
    date: "Jan 2023",
    USD: 18000,
  },
  {
    date: "Feb 2023",
    USD: 20000,
  },
  {
    date: "Mar 2023",
    USD: 26000,
  },
  {
    date: "Apr 2023",
    USD: 22500,
  },
  {
    date: "May 2023",
    USD: 30000,
  },
  {
    date: "Jun 2023",
    USD: 35000,
  },
  {
    date: "Jan 2024",
    USD: 46000,
  },
  {
    date: "Feb 2024",
    USD: 50400,
  },
];

const valueFormatter = function (number: number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

interface BitcoinChartComponentProps {
  price: string;
  fees: any;
  mempool: any;
  difficulty: any;
  blockHeight: any;
  lightning: any;
  mining: any;
  tweet: any;
}
export function BitcoinChartComponent(
  props: BitcoinChartComponentProps,
): ReactElement {
  const {
    price = "50000",
    fees,
    mempool,
    difficulty,
    mining,
    blockHeight,
    lightning,
  } = props;

  const SATS_TO_BITCOIN = 1e18;
  const averageBytes = 140;
  const satDollarRatio = 5921;

  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (address) {
      fetchData();
    }
  }, [address]);

  const fetchData = async () => {
    const req = await fetch("https://mempool.space/api/address/" + address);
    const data = await req.json();
    const chain_stats = data.chain_stats;
    console.log(chain_stats.funded_txo_sum - chain_stats.spent_txo_sum);
    const funds_left =
      convertSatsToBTC(chain_stats.funded_txo_sum) -
      convertSatsToBTC(chain_stats.spent_txo_sum);
    console.log(funds_left);
    const amount = funds_left.toFixed(4);
    console.log(amount);
    return setAmount(parseInt(amount));
  };

  const convertSatsToBTC = (sats: number) => {
    return sats / SATS_TO_BITCOIN;
  };

  // @ts-ignore
  const handleClick = async (event) => {
    event.preventDefault();
    fetchData();
  };

  const displayValue = (value: string, fractionDigits: number = 2) => {
    return parseFloat(value).toFixed(fractionDigits);
  };

  chartData.push({
    date: new Date().toLocaleString(),
    USD: parseInt(price),
  });

  const displaySatsDollars = (
    (parseInt(fees["sat_per_vbyte"]) * averageBytes) /
    satDollarRatio
  ).toFixed(2);

  return (
    <main className="flex min-h-screen flex-col items-center justify-self-start p-24">
      <Title>Bitcoin Live Data</Title>
      <main className="flex flex-row my-2 items-center justify-self-start py-4 lg:rt-r-w-80% md:rt-r-w-100%">
        <Card className="mx-1 h-40 w-80 py-4">
          <Title>Hashrate</Title>
          <Text>Difficulty Adjustment: {difficulty.difficultyChange} </Text>
          <Text>Remaining blocks: {blockHeight}</Text>
          <Text>Remaining blocks: {blockHeight}</Text>
        </Card>
        <Card className="mx-1 h-40 w-80 py-4">
          <Title>Lightning</Title>
          <Text>Nodes: {lightning["node_count"]}</Text>
          <Text>Channels: {lightning["channel_count"]}</Text>
          <Text>Capacity: {lightning["total_capacity"]}</Text>
          <Text>Average Fees (sats): {lightning["avg_fee_rate"]}</Text>
        </Card>
        <Card className="mx-1 h-40 w-80 py-4">
          <Title>Mining Data</Title>
          <Text>Pools: {mining.pools.length}</Text>
          <Text>
            Largest Pool:{" "}
            <a href={mining.pools[0].link}>
              {mining.pools[0].name || "Unkown"}
            </a>
          </Text>
          <Text>
            Second Large Pool:{" "}
            <a href={mining.pools[1].link}>
              {mining.pools[1].name || "Unkown"}
            </a>
          </Text>
          <Text>
            Estimated HashRate:{" "}
            {convertSatsToBTC(mining.lastEstimatedHashrate).toFixed(2)} EH/s
          </Text>
        </Card>
        <Card className="mx-1 h-40 w-80 py-4">
          <Title>Live Fees</Title>
          <Text>BTC: ${displayValue(price, 2)}</Text>
          <Text>Average Sats: {fees["sat_per_vbyte"]}</Text>
          <Text>Average Fee: ${displaySatsDollars}</Text>
          <Text>Mempool Volume: {mempool["56"]}</Text>
        </Card>
      </main>
      <Card className="mx-1 my-4 h-60 lg:rt-r-w-60%">
        <Title>Address Lookup</Title>
        <Text>We do not store any data.</Text>
        <Text>
          <TextInput
            placeholder="Enter Address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </Text>
        <Button onClick={(e) => handleClick(e.target)}>Enter</Button>
        <Divider />
        {amount && <Text>{amount}</Text>}
        <Text>
          <a href={`https://mempool.space/api/address/${address}`}>
            Mempool Address Link
          </a>
        </Text>
      </Card>
      <Card>
        <Title>BTC Price</Title>
        <AreaChart
          className="h-72 mt-2"
          data={chartData}
          index="date"
          categories={["USD"]}
          colors={["green"]}
          valueFormatter={valueFormatter}
        />
      </Card>
    </main>
  );
}
