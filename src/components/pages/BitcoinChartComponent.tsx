"use client";
import { AreaChart, Card, Title, Text } from "@tremor/react";
import { ReactElement } from "react";

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
}
export function BitcoinChartComponent(
  props: BitcoinChartComponentProps,
): ReactElement {
  const { price, fees, mempool, difficulty, mining, blockHeight, lightning } =
    props;
  chartData.push({
    date: new Date().toLocaleString(),
    USD: parseInt(price),
  });

  const displayPrice = parseFloat(price).toFixed(2);
  const averageBytes = 140;
  const satDollarRatio = 5921;
  const satsDollars =
    (parseInt(fees["sat_per_vbyte"]) * averageBytes) / satDollarRatio;
  const displaySatsDollars = satsDollars.toFixed(2);
  return (
    <main className="flex min-h-screen flex-col items-center justify-self-start p-24">
      <Title>Bitcoin Live Data</Title>
      <main className="flex flex-row my-2 items-center justify-self-start py-4">
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
            {(mining.lastEstimatedHashrate / 1e18).toFixed(2)} EH/s
          </Text>
        </Card>
        <Card className="mx-1 h-40 w-80 py-4">
          <Title>Live Fees</Title>
          <Text>BTC: ${displayPrice}</Text>
          <Text>Average Sats: {fees["sat_per_vbyte"]}</Text>
          <Text>Average Fee: ${displaySatsDollars}</Text>
          <Text>Mempool Volume: {mempool["56"]}</Text>
        </Card>
      </main>
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
