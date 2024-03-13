import { BitcoinChartComponent } from "@/components/pages/BitcoinChartComponent";
import WrapperComponent from "@/components/WrapperComponent";
import mempoolJS from "@mempool/mempool.js";

async function getData() {
  const [fees, lightning, mempool, mining] = await Promise.all([
    fetch("https://bitcoiner.live/api/fees/estimates/latest"),
    fetch("https://mempool.space/api/v1/lightning/statistics/latest"),
    fetch("https://bitcoiner.live/api/mempool/latest"),
    fetch("https://mempool.space/api/v1/mining/pools/1w"),
  ]);

  const price = await fetch(
    "https://api.api-ninjas.com/v1/cryptoprice?symbol=BTCUSDC",
    {
      headers: {
        "x-api-key": `${process.env.NEXT_API_NINJA_KEY}`,
      },
    },
  );

  const {
    bitcoin: { difficulty, blocks, transactions },
  } = mempoolJS({
    hostname: "mempool.space",
  });
  const difficultyAdjustment = await difficulty.getDifficultyAdjustment();
  const blockHeight = await blocks.getBlocksTipHeight();
  const mempoolData = await mempool.json();
  const miningData = await mining.json();
  const priceData = await price.json();
  const feesData = await fees.json();
  const lightningData = await lightning.json();
  return {
    difficulty: difficultyAdjustment,
    price: priceData,
    blockHeight: blockHeight,
    fees: feesData,
    mempool: mempoolData,
    lightning: lightningData.latest,
    mining: miningData,
  };
}
export default async function Confirmation() {
  const data = await getData();

  return (
    <WrapperComponent>
      <BitcoinChartComponent
        mining={data.mining}
        lightning={data.lightning}
        blockHeight={data.blockHeight}
        difficulty={data.difficulty}
        price={data.price.price}
        fees={data.fees.estimates["30"]}
        mempool={data.mempool.mempool}
      />
    </WrapperComponent>
  );
}
