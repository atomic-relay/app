import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { KeyOrAlias } from "@lightsparkdev/core";
import {
  useEnvironmentSettings,
  BlockchainNetwork,
} from "@/providers/EnvironmentSettingsProvider";
import { useLightsparkClient } from "@/providers/LightSparkClientProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Snippet } from "@/components/ui/snippet";
import { useSharedState } from "@/providers/SharedStateProvider";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { WalletName } from "@/components/types";

type DepositProps = {
  signingPrivateKey: string;
  walletName: WalletName;
  close: () => Promise<void>;
};

/**
 * Deposit form for depositing funds into a Lightspark wallet.
 */
const Deposit = ({ signingPrivateKey, walletName, close }: DepositProps) => {
  const { blockchainNetwork } = useEnvironmentSettings();

  const RegTestDeposit = () => {
    const [amountMsats, setAmountMsats] = useState(0);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { addActivityLog } = useSharedState();
    const client = useLightsparkClient();

    const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
      setError("");
      setAmountMsats(Number(e.target.value));
    };

    const regtestDeposit = async () => {
      if (amountMsats <= 0) {
        setError("Please enter a valid amount");
        return;
      }
      setError("");
      setIsLoading(true);

      /**
       * Funds the REGTEST node by creating an invoice and a test mode payment.
       * See Lightspark documentation for funding real nodes.
       */
      await client
        .getClient()
        .loadWalletSigningKey(KeyOrAlias.key(signingPrivateKey));
      const invoice = await client
        .getClient()
        .createInvoice(Math.round(amountMsats * 1000), "Test wallet funding");
      console.log("created test invoice", invoice);

      if (!invoice) {
        setError("Could not retrieve invoice data. Please retry.");
        addActivityLog({
          timestamp: new Date(),
          event: `Create test invoice for Wallet ${walletName}`,
          status: "Error",
        });
        return;
      }
      addActivityLog({
        timestamp: new Date(),
        event: `Create test invoice for Wallet ${walletName}`,
        status: "Success",
      });

      const payment = await client
        .getClient()
        .createTestModePayment(invoice.data.encodedPaymentRequest);
      console.log("deposited money via test invoice payment", payment);

      if (!payment) {
        setError("Could not retrieve payment data. Please retry.");
        addActivityLog({
          timestamp: new Date(),
          event: `Deposit ${invoice.data.amount.originalValue} sats for Wallet ${walletName}`,
          status: "Error",
        });
        return;
      }
      addActivityLog({
        timestamp: new Date(),
        event: `Deposit ${invoice.data.amount.originalValue} sats for Wallet ${walletName}`,
        status: "Success",
      });

      // Placeholder sleep for pending transaction to finish.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await close();
      setIsLoading(false);
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        regtestDeposit();
      }
    };

    return (
      <>
        <DialogHeader>
          <DialogTitle>
            <div className="text-lg font-semibold mb-0.5">Add funds</div>
          </DialogTitle>
          <DialogDescription>
            Youre adding test funds to wallet {walletName}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid w-full items-center gap-1.5 pb-4">
          <Label
            htmlFor="amount"
            className={`${error ? "text-red-500" : "text-primary"}`}
          >
            Amount
          </Label>
          <Input
            type="number"
            placeholder="Enter sats"
            className={`${error ? "border-red-500" : ""}`}
            value={String(amountMsats)}
            onChange={onChangeAmount}
            onKeyPress={handleEnter}
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <DialogFooter className="flex items-end gap-2">
          <Button variant="ghost" onClick={close}>
            Cancel
          </Button>
          <Button onClick={regtestDeposit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add funds
          </Button>
        </DialogFooter>
      </>
    );
  };

  const FundingAddressDeposit = () => {
    const [fundingAddress, setFundingAddress] = useState<string | null>();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const client = useLightsparkClient();

    const createFundingAddress = async () => {
      setError("");
      setIsLoading(true);

      /**
       * Funds the test mode by creating an invoice and a test mode payment.
       * See documentation for funding real nodes.
       */
      await client
        .getClient()
        .loadWalletSigningKey(KeyOrAlias.key(signingPrivateKey));
      const fundingAddress = await client
        .getClient()
        .createBitcoinFundingAddress();

      if (!fundingAddress) {
        setError("Could not retrieve funding address data. Please retry.");
        return;
      }

      setIsLoading(false);
      return fundingAddress;
    };

    useEffect(() => {
      if (!fundingAddress) {
        createFundingAddress().then((fundingAddress) => {
          setFundingAddress(fundingAddress);
        });
      }
    }, []);

    let content;
    if (isLoading) {
      content = <Skeleton />;
    } else if (fundingAddress) {
      content = (
        <>
          <label>Use this bitcoin address to fund your lightning wallet:</label>
          <br />
          <Snippet codeString={fundingAddress} color="primary" />
        </>
      );
    }

    return (
      <>
        <DialogHeader>
          <DialogTitle>
            <div className="text-lg font-semibold mb-0.5">Add funds</div>
          </DialogTitle>
          <DialogDescription>
            Youre adding test funds to wallet {walletName}.
          </DialogDescription>
        </DialogHeader>

        <label>
          {isLoading && <Skeleton />}
          {!isLoading && content}
        </label>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <DialogFooter className="flex items-end">
          <Button onClick={close}>Dismiss</Button>
        </DialogFooter>
      </>
    );
  };

  switch (blockchainNetwork) {
    case BlockchainNetwork.REGTEST:
      return <RegTestDeposit />;
    case BlockchainNetwork.TESTNET:
    case BlockchainNetwork.MAINNET:
    default:
      return <FundingAddressDeposit />;
  }
};

export default Deposit;
