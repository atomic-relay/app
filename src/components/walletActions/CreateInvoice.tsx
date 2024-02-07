import { useState } from "react";
import { Loader2 } from "lucide-react";
import { KeyOrAlias } from "@lightsparkdev/core";
import { useLightsparkClient } from "@/providers/LightSparkClientProvider";
import { useSharedState } from "@/providers/SharedStateProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WalletName } from "@/components/types";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getOtherWalletName } from "@/lib/utils";

type CreateInvoiceProps = {
  signingPrivateKey: string;
  walletName: WalletName;
  close: () => void;
};

/**
 * Dialog contents to create an invoice for the other wallet to pay.
 */
const CreateInvoice = ({
  signingPrivateKey,
  walletName,
  close,
}: CreateInvoiceProps) => {
  const client = useLightsparkClient();
  const { addInvoice, addActivityLog } = useSharedState();
  const [amountMsats, setAmountMsats] = useState(0);
  const [memo, setMemo] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createInvoice = async () => {
    if (amountMsats <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setError("");
    setIsLoading(true);

    await client
      .getClient()
      .loadWalletSigningKey(KeyOrAlias.key(signingPrivateKey));
    const invoice = await client
      .getClient()
      .createInvoice(Math.round(amountMsats * 1000), memo);
    console.log("created invoice", invoice);
    if (invoice) {
      addInvoice(walletName, invoice);
    } else {
      setIsLoading(false);
      setError("Could not create invoice. Please retry.");
      addActivityLog({
        timestamp: new Date(),
        event: `Create invoice for Wallet ${walletName}`,
        status: "Error",
      });
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
      createInvoice();
    }
  };

  const otherWalletName = getOtherWalletName(walletName);

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <div className="text-lg font-semibold mb-0.5">
            Request payment from {otherWalletName}
          </div>
        </DialogTitle>
        <DialogDescription>
          You’re requesting money from Wallet {otherWalletName}.
        </DialogDescription>
      </DialogHeader>

      <div className="grid w-full items-center gap-1.5 mb-2">
        <Label
          htmlFor="amount"
          className={`${error ? "text-red-500" : "text-primary"}`}
        >
          Amount
        </Label>
        <Input
          type="number"
          placeholder="Enter amount in sats"
          className={`${error ? "border-red-500" : ""}`}
          value={String(amountMsats)}
          onChange={onChangeAmount}
          onKeyPress={handleEnter}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <div className="grid w-full items-center gap-1.5 mb-4">
        <Label htmlFor="memo">Note (optional)</Label>
        <Input
          type="string"
          placeholder="(e.g. 'Pizza time!')"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          onKeyPress={handleEnter}
        />
      </div>

      <DialogFooter className="flex items-end gap-2">
        <Button variant="ghost" onClick={close}>
          Cancel
        </Button>
        <Button onClick={createInvoice} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </DialogFooter>
    </>
  );
};

export default CreateInvoice;
