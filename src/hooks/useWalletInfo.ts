import { Wallet } from "@lightsparkdev/wallet-sdk";
import { useCallback, useState } from "react";
import { useLightsparkClient } from "@/providers/LightSparkClientProvider";

const useWalletInfo = () => {
  const client = useLightsparkClient();
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const refresh = useCallback(async () => {
    if (!client.isLoaded) {
      return;
    }

    const isAuthed = await client.isAuthorized();
    if (!isAuthed) {
      return;
    }

    const wallet = await client.getClient().getCurrentWallet();
    if (wallet) {
      setWallet(wallet);
    }
  }, [client.isLoaded]);

  return { wallet, refresh };
};

export default useWalletInfo;
