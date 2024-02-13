"use client";
import { AreaChart, Card, Title, Text } from "@tremor/react";
import { ReactElement } from "react";
import { Money, Currencies } from "ts-money";

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
}
export function BitcoinChartComponent(
  props: BitcoinChartComponentProps,
): ReactElement {
  const { price, fees, mempool } = props;
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
      <Card className="my-4">
        <Title>Live Fees</Title>
        <Text>BTC: ${displayPrice}</Text>
        <Text>Average Sats: {fees["sat_per_vbyte"]}</Text>
        <Text>Average Fee: ${displaySatsDollars}</Text>
        <Text>Mempool Volume: {mempool["56"]}</Text>
      </Card>
      <Card>
        <Title>Price Over Time</Title>
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
