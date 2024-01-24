"use client";
import {
  Button,
  Card,
  Flex,
  Icon,
  Metric,
  NumberInput,
  Text,
} from "@tremor/react";
import {
  CurrencyDollarIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/outline";
import { ReactElement, useState, useEffect } from "react";
import { Money } from "ts-money";
import { useRouter } from "next/router";

interface ConfirmationProps {
  searchParams: any;
}

export function ConfirmationComponent(props: ConfirmationProps): ReactElement {
  const router = useRouter();

  const { keyword1: base, keyword2: exchange } = router.query;
  const baseAmount = parseInt(props?.searchParams[base] || "0");
  const exchangeAmount = parseInt(props?.searchParams[exchange] || "0");
  const rate = parseInt(props?.searchParams["rate"]);

  const [dollar, setDollars] = useState(baseAmount);
  const [euro, setEuros] = useState(exchangeAmount);
  const exchangeRate = rate || 1.1;

  useEffect(() => {
    if (dollar) {
      const dollarMoney = new Money(dollar * 100, "USD");
      setEuros(Math.round((dollarMoney.amount * exchangeRate) / 100));
    }
  }, [dollar]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-self-start p-24">
      <Card className="max-w-xs my-4 mx-auto">
        <NumberInput
          className="my-2"
          icon={CurrencyDollarIcon}
          onValueChange={(val) => setDollars(val)}
          placeholder="Send.."
        />
        <Flex className="mt-2">
          <Text>$USD Rate</Text>
          <Metric className="text-base">${dollar}</Metric>
        </Flex>
        <Flex className="mt-2 mx-auto">
          <Icon className="w-8 h-8 text-center" icon={ArrowDownCircleIcon} />
        </Flex>
        <Flex className="mt-2">
          <Text>$EUR Rate</Text>
          <Metric className="text-base">${euro}</Metric>
        </Flex>
        <Button className="my-2" onClick={() => setDollars(0)}>
          Submit
        </Button>
        <Flex className="mt-4">
          <Text>1% fee</Text>
          <Text>Delivery 1-24 hrs</Text>
        </Flex>
      </Card>
    </main>
  );
}
