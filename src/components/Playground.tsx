import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSharedState } from "@/providers/SharedStateProvider";
import { WalletName } from "@/components/types";
import LightsparkClientProvider from "@/providers/LightSparkClientProvider";
import Wallet from "./Wallet";
import ActivityLog from "./ActivityLog";

type PlaygroundProps = {
  isConfigured?: boolean;
};

/**
 * Playground component which includes wallets and the activity log.
 */
const Playground = ({ isConfigured = false }: PlaygroundProps) => {
  const { numWallets, addWallet, getWalletId } = useSharedState();

  const createWallet = () => {
    if (numWallets === 0) {
      addWallet(WalletName.A);
    } else if (numWallets === 1) {
      addWallet(WalletName.B);
    }
  };

  const AddFirstWallet = () => {
    return (
      <Card className="w-full h-[200px]">
        <CardContent className="flex flex-col items-center justify-center w-full h-full p-0">
          {!isConfigured && (
            <div className="grid place-content-center text-center mb-4">
              <div className="text-lg font-semibold">
                Send and request payments
              </div>
              <p className="text-sm text-muted-foreground">
                Connect your Lightspark account to begin.
              </p>
            </div>
          )}
          {isConfigured && (
            <Button onClick={createWallet} disabled={!isConfigured}>
              Create wallet A
            </Button>
          )}
        </CardContent>
      </Card>
    );
  };

  const AddWalletCard = () => {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center w-full h-full p-0">
          <Button onClick={createWallet}>Create wallet B</Button>
        </CardContent>
      </Card>
    );
  };

  let walletSection;
  if (numWallets === 0) {
    walletSection = <AddFirstWallet />;
  } else {
    walletSection = (
      <div className={`flex flex-row w-full h-[200px] gap-4`}>
        <div className="w-full relative">
          <LightsparkClientProvider userName={getWalletId(WalletName.A)}>
            <Wallet
              walletName={WalletName.A}
              walletId={getWalletId(WalletName.A)}
            />
          </LightsparkClientProvider>
        </div>
        {numWallets === 2 && (
          <div className={"w-full h-full relative"}>
            <LightsparkClientProvider userName={getWalletId(WalletName.B)}>
              <Wallet
                walletName={WalletName.B}
                walletId={getWalletId(WalletName.B)}
              />
            </LightsparkClientProvider>
          </div>
        )}
        <div className={`w-1/3 h-full ${numWallets === 1 ? "" : "hidden"}`}>
          <AddWalletCard />
        </div>
      </div>
    );
  }

  return (
    <>
      <p className="text-muted-foreground mb-8">
        Test sending and requesting Bitcoin over the Lightning network.
      </p>

      {walletSection}

      <div className="text-lg font-semibold mt-12">Activity log</div>
      <p className="text-muted-foreground mb-4">Understand whats happening.</p>
      <ActivityLog />
    </>
  );
};

export default Playground;
