"use client";
import { AreaChart, Card, Title } from "@tremor/react";
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

  const averageBytes = 140;
  const satDollarRatio = 5921;
  const satsDollars =
    (parseInt(fees["sat_per_vbyte"]) * averageBytes) / satDollarRatio;
  return (
    <main className="flex min-h-screen flex-col items-center justify-self-start p-24">
      <Card>
        <Title>Live Fees</Title>
        <h3>BTC: ${price}</h3>
        <h3>Sats: {fees["sat_per_vbyte"]}</h3>
        <h3>${satsDollars}</h3>
        <h3>Mempool Volume: {mempool["56"]}</h3>
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
