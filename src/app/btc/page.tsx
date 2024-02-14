import { BitcoinChartComponent } from "@/components/pages/BitcoinChartComponent";
import WrapperComponent from "@/components/WrapperComponent";
import mempoolJS from "@mempool/mempool.js";

async function getData() {
  const price = await fetch(
    "https://api.api-ninjas.com/v1/cryptoprice?symbol=BTCUSDC",
    {
      cache: "no-cache",
      headers: {
        "x-api-key": `${process.env.NEXT_API_NINJA_KEY}`,
      },
    },
  );
  const {
    bitcoin: { difficulty, blocks },
  } = mempoolJS({
    hostname: "mempool.space",
  });

  const difficultyAdjustment = await difficulty.getDifficultyAdjustment();
  console.log(difficultyAdjustment);

  const blockHeight = await blocks.getBlocksTipHeight();
  console.log(blockHeight);

  const fees = await fetch("https://bitcoiner.live/api/fees/estimates/latest", {
    cache: "no-cache",
  });
  const mempool = await fetch(" https://bitcoiner.live/api/mempool/latest", {
    cache: "no-cache",
  });
  const mempoolData = await mempool.json();
  const priceData = await price.json();
  const feesData = await fees.json();
  return {
    difficulty: difficultyAdjustment,
    price: priceData,
    blockHeight: blockHeight,
    fees: feesData,
    mempool: mempoolData,
  };
}

export default async function Confirmation() {
  const data = await getData();

  return (
    <WrapperComponent>
      <BitcoinChartComponent
        blockHeight={data.blockHeight}
        difficulty={data.difficulty}
        price={data.price.price}
        fees={data.fees.estimates["30"]}
        mempool={data.mempool.mempool}
      />
    </WrapperComponent>
  );
}
