"use client";
import { Card, Text, Metric, Flex, ProgressBar, NumberInput } from "@tremor/react";
import { Icon } from "@tremor/react";

import { CurrencyDollarIcon, CurrencyEuroIcon, ArrowCircleDownIcon } from '@heroicons/react/outline';
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
    </main>
  )
}

export default Home
