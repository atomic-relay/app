import { BitcoinChartComponent } from "@/components/pages/BitcoinChartComponent";
import WrapperComponent from "@/components/WrapperComponent";

async function getData() {
  const price = await fetch(
    "https://api.api-ninjas.com/v1/cryptoprice?symbol=BTCUSD",
    {
      cache: "no-cache",
      headers: {
        "x-api-key": `${process.env.NEXT_API_NINJA_KEY}`,
      },
    },
  );
  const fees = await fetch("https://bitcoiner.live/api/fees/estimates/latest", {
    cache: "no-cache",
  });
  const priceData = await price.json();
  const feesData = await fees.json();
  return {
    price: priceData,
    fees: feesData,
  };
}

export default async function Confirmation() {
  const data = await getData();

  return (
    <WrapperComponent>
      <h1>{JSON.stringify(data)}</h1>
      <BitcoinChartComponent
        price={data.price.price}
        fees={data.fees.estimates["30"]}
      />
      ;
    </WrapperComponent>
  );
}
