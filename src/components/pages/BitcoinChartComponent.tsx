"use client";
import { AreaChart, Card, Title } from "@tremor/react";
import { ReactElement } from "react";

const chartdata = [
  {
    date: "Jan 2023",
    USD: 18000,
    SATS: 100000,
  },
  {
    date: "Feb 2023",
    USD: 20000,
    SATS: 100000,
  },
  {
    date: "Mar 2023",
    USD: 26000,
    SATS: 100000,
  },
  {
    date: "Apr 2023",
    USD: 22500,
    SATS: 100000,
  },
  {
    date: "May 2023",
    USD: 30000,
    SATS: 100000,
  },
  {
    date: "Jun 2023",
    USD: 35000,
    SATS: 100000,
  },
];

const valueFormatter = function (number: number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

export function BitcoinChartComponent(): ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-self-start p-24">
      <Card>
        <Title>Price Over Time</Title>
        <AreaChart
          className="h-72 mt-2"
          data={chartdata}
          index="date"
          categories={["USD", "SATS"]}
          colors={["green", "red"]}
          valueFormatter={valueFormatter}
        />
      </Card>
    </main>
  );
}
