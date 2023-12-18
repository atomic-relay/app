"use client";
import { Card, Text, Metric, Flex, ProgressBar, NumberInput } from "@tremor/react";
import { AreaChart, Title, Icon } from "@tremor/react";
import { CurrencyDollarIcon, CurrencyEuroIcon, ArrowCircleDownIcon } from '@heroicons/react/outline';


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

const valueFormatter = function(number: number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-self-start p-24">
      <Card className="max-w-xs my-4 mx-auto">
        <Flex className="mt-4">
          <Text>$USD Exchange Rate</Text>
          <Metric className="text-base">$1.00</Metric>
        </Flex>
        <Flex className="mt-4 mx-auto">
          <Icon className="w-8 h-8 text-center" icon={ArrowCircleDownIcon} />
        </Flex>
        <Flex className="mt-4">
          <Text>$EUR Exchange Rate</Text>
          <Metric className="text-base">$1.04</Metric>
        </Flex>
        <ProgressBar value={32} className="mt-2" />
      </Card>
      <Card className="max-w-xs my-4 mx-auto">
        <Text>Swap</Text>
        <NumberInput className="my-2" icon={CurrencyDollarIcon} placeholder="Send.." />
        <NumberInput className="my-2"icon={CurrencyEuroIcon} placeholder="Receive..." />
        <Flex className="mt-4">
          <Text>1% fee</Text>
          <Text>Delivery 1 hr</Text>
        </Flex>
      </Card>
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
  )
}

export default Home
