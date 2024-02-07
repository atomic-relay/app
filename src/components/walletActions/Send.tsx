import { useState } from "react";
import { Loader2 } from "lucide-react";
import { KeyOrAlias } from "@lightsparkdev/core";
import { TransactionStatus } from "@lightsparkdev/wallet-sdk";
import { useLightsparkClient } from "@/providers/LightSparkClientProvider";
import { useSharedState } from "@/providers/SharedStateProvider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { WalletName } from "@/components/types";
import { getOtherWalletName } from "@/lib/utils";

type SendProps = {
  signingPrivateKey: string;
  walletName: WalletName;
  close: () => void;
};

/**
 * Dialog contents for sending payments to another Lightspark Wallet.
 * Send is implemented in this demo using an automatically generated invoice saved per wallet
 * that allows another wallet to send any amount.
 */
const Send = ({ signingPrivateKey, walletName, close }: SendProps) => {
  const client = useLightsparkClient();
  const { removeSendInvoice, addActivityLog, sendInvoicePerWallet } =
    useSharedState();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [amountMsats, setAmountMsats] = useState(0);

  const otherWalletName = getOtherWalletName(walletName);

  const sendPayment = async () => {
    if (amountMsats <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setError("");
    setIsLoading(true);

    const invoice = sendInvoicePerWallet[otherWalletName];

    await client
      .getClient()
      .loadWalletSigningKey(KeyOrAlias.key(signingPrivateKey));
    const payment = await client
      .getClient()
      .payInvoiceAndAwaitResult(
        invoice.data.encodedPaymentRequest,
        1_000_000,
        Math.round(amountMsats * 1000),
      );
    console.log("sent payment", payment);

    if (payment.status === TransactionStatus.SUCCESS) {
      addActivityLog({
        timestamp: new Date(),
        event: `Wallet ${walletName} paid ${payment.amount.originalValue / 1000} sats to Wallet ${getOtherWalletName(walletName)}`,
        status: "Complete",
      });
      removeSendInvoice(getOtherWalletName(walletName));
    } else {
      setIsLoading(false);
      setError("Payment failed");
      addActivityLog({
        timestamp: new Date(),
        event: `Create payment for Wallet ${walletName}`,
        status: "Error",
      });
      return;
    }

    setIsLoading(false);
    close();
  };

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setAmountMsats(Number(e.target.value));
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendPayment();
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <div className="text-lg font-semibold mb-0.5">
            Send payment to Wallet {otherWalletName}
          </div>
        </DialogTitle>
        <DialogDescription>
          You’re sending a test payment from wallet {walletName} to wallet{" "}
          {otherWalletName}.
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
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <DialogFooter className="flex items-end gap-2">
        <Button variant="ghost" onClick={close}>
          Cancel
        </Button>
        <Button onClick={sendPayment} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </DialogFooter>
    </>
  );
};

export default Send;
