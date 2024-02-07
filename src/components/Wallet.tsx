import { useState, useEffect, ReactElement, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { b64encode, DefaultCrypto, KeyOrAlias } from "@lightsparkdev/core";
import {
  KeyType,
  Wallet as WalletType,
  WalletStatus,
  Invoice,
  TransactionStatus,
} from "@lightsparkdev/wallet-sdk";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import useWalletInfo from "@/hooks/useWalletInfo";
import { useLightsparkClient } from "@/providers/LightSparkClientProvider";
import CreateInvoice from "./walletActions/CreateInvoice";
import Deposit from "./walletActions/Deposit";
import Send from "./walletActions/Send";
import { useEnvironmentSettings } from "@/providers/EnvironmentSettingsProvider";
import { useSharedState } from "@/providers/SharedStateProvider";
import { WalletName } from "@/components/types";
import { getOtherWalletName } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface WalletProps {
  walletName: WalletName;
  walletId: string;
}

interface GenerateDemoTokenResult {
  accountId: string;
  jwt: string;
}

interface Progress {
  percentage: number;
  message: string;
}

/**
 * Wallet component reponsible for initializing the wallet and displaying the wallet info.
 */
const Wallet = ({ walletName, walletId }: WalletProps) => {
  const client = useLightsparkClient();
  const { wallet, refresh: refreshWallet } = useWalletInfo();
  const { blockchainNetwork, deploymentEnvironment } = useEnvironmentSettings();
  const {
    addActivityLog,
    addSendInvoice,
    sendInvoicePerWallet,
    numWallets,
    invoicePerWallet,
    removeInvoice,
  } = useSharedState();
  const [progress, setProgress] = useState<Progress>({
    percentage: 0,
    message: "",
  });
  const [isReloading, setIsReloading] = useState(false);
  const [modalContent, setModalContent] = useState<ReactElement | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [signingPrivateKey, setSigningPrivateKey] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (sendInvoicePerWallet[walletName]) {
      reloadWallet();
    }
  }, [invoicePerWallet, sendInvoicePerWallet]);

  useEffect(() => {
    if (client.isLoaded) {
      login();
    }
  }, [client.isLoaded]);

  useEffect(() => {
    retrievePrivateKey();
  }, [wallet?.id]);

  const retrievePrivateKey = useCallback(async () => {
    if (!signingPrivateKey && wallet?.id) {
      const res = await fetch(
        `/api/getWalletPrivateKey?walletId=${wallet?.id}`,
      ).then((res) => res.json());
      setSigningPrivateKey(res.encodedPrivateKey);
    }
  }, [wallet?.id]);

  const generateDemoTokens = async (): Promise<
    GenerateDemoTokenResult | undefined
  > => {
    setError(undefined);

    const {
      accountId,
      token: jwt,
      error,
    } = await fetch(
      `/api/jwt?userName=${walletId}&blockchainNetwork=${blockchainNetwork}&deploymentEnvironment=${deploymentEnvironment}`,
    ).then((res) => res.json());

    if (jwt) {
      addActivityLog({
        timestamp: new Date(),
        event: `JWT for Wallet ${walletName}`,
        status: "Created",
      });
      return { accountId, jwt };
    } else if (error) {
      addActivityLog({
        timestamp: new Date(),
        event: `JWT for Wallet ${walletName}`,
        status: "Error",
      });
      setError(error);
    }
  };

  const login = async () => {
    setProgress({ percentage: 20, message: "Generated JWT tokens..." });
    const generateDemoTokenResult = await generateDemoTokens();
    if (!generateDemoTokenResult) {
      return;
    }
    setProgress({ percentage: 40, message: "Logging in with JWT..." });

    const { accountId, jwt } = generateDemoTokenResult;
    try {
      const { wallet } = await client.login(accountId, jwt);
      addActivityLog({
        timestamp: new Date(),
        event: `Login with JWT for Wallet ${walletName}`,
        status: "Success",
      });

      addActivityLog({
        timestamp: new Date(),
        event: `Wallet ${walletName} loaded`,
        status: wallet.status,
      });

      await setupWallet(wallet);
    } catch (e) {
      console.error(e);
      setError("Failed to login with JWT");
      addActivityLog({
        timestamp: new Date(),
        event: `Login with JWT for Wallet ${walletName}`,
        status: "Error",
      });
    }
  };

  const setupWallet = async (wallet: WalletType) => {
    let walletStatus = wallet.status;
    if (walletStatus === "NOT_SETUP") {
      setProgress({ percentage: 60, message: "Deploying wallet..." });
      try {
        walletStatus = await client.getClient().deployWalletAndAwaitDeployed();
        addActivityLog({
          timestamp: new Date(),
          event: `Wallet ${walletName} deployed`,
          status: walletStatus,
        });
      } catch (e) {
        console.error(e);
        setError("Failed to deploy wallet");
        addActivityLog({
          timestamp: new Date(),
          event: `Wallet ${walletName} failed to deploy`,
          status: "Error",
        });
        return;
      }
    }

    if (walletStatus === "DEPLOYED") {
      setProgress({ percentage: 80, message: "Initializing wallet..." });
      try {
        walletStatus = await initializeWallet(wallet);
        addActivityLog({
          timestamp: new Date(),
          event: `Wallet ${walletName} initialized`,
          status: walletStatus,
        });
      } catch (e) {
        console.error(e);
        setError("Failed to initialize wallet");
        addActivityLog({
          timestamp: new Date(),
          event: `Wallet ${walletName} failed to initialize`,
          status: "Error",
        });
        return;
      }
    }

    if (
      !wallet?.balances ||
      wallet?.balances?.ownedBalance?.originalValue === 0
    ) {
      setProgress({
        percentage: 90,
        message: "Depositing some initial funds...",
      });
      try {
        /**
         * Funds the REGTEST node by creating an invoice and a test mode payment.
         * See Lightspark documentation for funding real nodes.
         */
        const res = await fetch(
          `/api/getWalletPrivateKey?walletId=${wallet?.id}`,
        ).then((res) => res.json());
        await client
          .getClient()
          .loadWalletSigningKey(KeyOrAlias.key(res.encodedPrivateKey));
        const invoice = await client
          .getClient()
          .createInvoice(10000 * 1000, "Test wallet initial funding");

        if (!invoice) {
          setError("Could not fund wallet. Please retry.");
          addActivityLog({
            timestamp: new Date(),
            event: `Create test invoice for Wallet ${walletName}`,
            status: "Error",
          });
          return;
        }

        const payment = await client
          .getClient()
          .createTestModePayment(invoice.data.encodedPaymentRequest);
        if (!payment) {
          setError("Could not fund wallet. Please retry.");
          addActivityLog({
            timestamp: new Date(),
            event: `Deposit initial funds for Wallet ${walletName}`,
            status: "Error",
          });
          return;
        }

        addActivityLog({
          timestamp: new Date(),
          event: `Deposit initial funds for Wallet ${walletName}`,
          status: "Success",
        });
      } catch (e) {
        console.error(e);
        setError("Failed to deposit initial funds");
        addActivityLog({
          timestamp: new Date(),
          event: `Wallet ${walletName} failed to deposit initial funds`,
          status: "Error",
        });
        return;
      }
    }

    setProgress({ percentage: 100, message: "Finalizing..." });

    await reloadWallet();
  };

  const initializeWallet = async (wallet: WalletType) => {
    const keys = await DefaultCrypto.generateSigningKeyPair();
    const serializedPublicKeyBytes = await DefaultCrypto.serializeSigningKey(
      keys.publicKey,
      "spki",
    );
    const serializedPrivateKeyBytes = await DefaultCrypto.serializeSigningKey(
      keys.privateKey,
      "pkcs8",
    );
    const encodedPublicKey = b64encode(serializedPublicKeyBytes);
    const encodedPrivateKey = b64encode(serializedPrivateKeyBytes);

    // You can save the keys somewhere here if you want to use them later. Here,
    // we're just saving them to a replit db for demo purposes.
    await fetch("/api/saveWalletKeys", {
      method: "POST",
      body: JSON.stringify({
        walletId: wallet!.id,
        encodedPublicKey,
        encodedPrivateKey,
      }),
    });

    return await client
      .getClient()
      .initializeWalletAndAwaitReady(
        KeyType.RSA_OAEP,
        encodedPublicKey,
        KeyOrAlias.key(encodedPrivateKey),
      );
  };

  const reloadWallet = async () => {
    setIsReloading(true);
    await refreshWallet();
    setIsReloading(false);
  };

  const openModal = async (content: ReactElement) => {
    setIsModalOpen(true);
    setModalContent(content);
  };

  const closeModal = async () => {
    setModalContent(undefined);
    setIsModalOpen(false);
    await reloadWallet();
  };

  /**
   * Wallet component displayed once the wallet has finished initializing.
   * Here, you can perform wallet-related operations in the UI.
   */
  const ReadyWallet = () => {
    const [incomingInvoice, setIncomingInvoice] = useState<
      Invoice | undefined
    >();
    const [outgoingInvoice, setOutgoingInvoice] = useState<
      Invoice | undefined
    >();
    const [isPayInvoiceLoading, setIsPayInvoiceLoading] = useState(false);

    const otherWalletName = getOtherWalletName(walletName);

    useEffect(() => {
      // Always have a "send" invoice available for the wallet so that the other wallet can pay an arbitrary amount.
      if (
        signingPrivateKey &&
        client.isLoaded &&
        !sendInvoicePerWallet[walletName]
      ) {
        createSendInvoice(signingPrivateKey);
      }
    }, [signingPrivateKey, client.isLoaded, sendInvoicePerWallet]);

    const createSendInvoice = async (signingPrivateKey: string) => {
      await client
        .getClient()
        .loadWalletSigningKey(KeyOrAlias.key(signingPrivateKey));
      try {
        const invoice = await client
          .getClient()
          .createInvoice(0, "Invoice for sending arbitrary payments");

        if (invoice) {
          addSendInvoice(walletName, invoice);
        } else {
          setError("Could not create send invoice. Please retry.");
        }
      } catch (e) {
        setError("Could not create send invoice. Please retry.");
      }
    };

    useEffect(() => {
      if (invoicePerWallet[otherWalletName]) {
        setIncomingInvoice(invoicePerWallet[otherWalletName]);
      } else if (invoicePerWallet[walletName]) {
        setOutgoingInvoice(invoicePerWallet[walletName]);
      } else {
        setIncomingInvoice(undefined);
        setOutgoingInvoice(undefined);
      }
    }, [invoicePerWallet]);

    const payInvoice = async () => {
      setIsPayInvoiceLoading(true);

      const invoice = invoicePerWallet[otherWalletName];

      await client
        .getClient()
        .loadWalletSigningKey(KeyOrAlias.key(signingPrivateKey!));
      const payment = await client
        .getClient()
        .payInvoiceAndAwaitResult(
          invoice.data.encodedPaymentRequest,
          1_000_000,
        );
      console.log("paid invoice", payment);

      if (payment.status === TransactionStatus.SUCCESS) {
        addActivityLog({
          timestamp: new Date(),
          event: `Wallet ${walletName} paid ${payment.amount.originalValue / 1000} sats to Wallet ${otherWalletName}`,
          status: "Complete",
        });
        removeInvoice(otherWalletName);
        setIncomingInvoice(undefined);
      } else {
        setIsPayInvoiceLoading(false);
        setError("Payment failed");
        addActivityLog({
          timestamp: new Date(),
          event: `Create payment for Wallet ${walletName}`,
          status: "Error",
        });
        return;
      }

      setIsPayInvoiceLoading(false);
    };

    const balanceMillisatoshi =
      wallet?.balances?.availableToSendBalance?.originalValue || 0;

    const isSendEnabled =
      signingPrivateKey &&
      numWallets > 1 &&
      sendInvoicePerWallet[otherWalletName];
    const isRequestEnabled = signingPrivateKey && numWallets > 1;

    const incomingInvoiceButtons = (
      <>
        <Button
          variant="outline"
          className="w-full"
          size="sm"
          onClick={() => removeInvoice(otherWalletName)}
        >
          Cancel
        </Button>
        <Button
          className="w-full"
          size="sm"
          disabled={isPayInvoiceLoading || !signingPrivateKey}
          onClick={payInvoice}
        >
          {isPayInvoiceLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Pay request
        </Button>
      </>
    );

    const sendAndRequestButtons = (
      <>
        <DialogTrigger asChild>
          <Button
            disabled={!isSendEnabled}
            variant="outline"
            className="w-full"
            size="sm"
            onClick={() =>
              openModal(
                <Send
                  signingPrivateKey={signingPrivateKey!}
                  walletName={walletName}
                  close={closeModal}
                />,
              )
            }
          >
            Send
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button
            disabled={!isRequestEnabled}
            variant="outline"
            className="w-full"
            size="sm"
            onClick={() =>
              openModal(
                <CreateInvoice
                  signingPrivateKey={signingPrivateKey!}
                  walletName={walletName}
                  close={closeModal}
                />,
              )
            }
          >
            Request
          </Button>
        </DialogTrigger>
      </>
    );

    return (
      <>
        <CardHeader className="flex flex-row items-center justify-center justify-between w-full h-[52px] p-0 px-[16px]">
          <small className="text-sm font-medium leading-none">{`Wallet ${walletName}`}</small>

          <div>
            <DialogTrigger asChild>
              <Button
                disabled={!signingPrivateKey}
                variant="outline"
                className="w-[126px] mb-1"
                size="sm"
                onClick={() =>
                  openModal(
                    <Deposit
                      signingPrivateKey={signingPrivateKey!}
                      walletName={walletName}
                      close={closeModal}
                    />,
                  )
                }
              >
                Add funds
              </Button>
            </DialogTrigger>
          </div>
        </CardHeader>
        <Separator className="h-[1px] w-full" />
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-[24px]">
            <Label htmlFor="balance">Balance</Label>
            {isReloading && (
              <div className="flex flex-row">
                <Skeleton className="w-1/5 rounded-lg">
                  <div className="h-8 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
                <span className="text-2xl font-bold ml-2">sats</span>
              </div>
            )}
            {!isReloading && (
              <span className="text-2xl font-bold">
                {(balanceMillisatoshi / 1000).toLocaleString()} sats
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between max-w-[420px] gap-1">
          {incomingInvoice && incomingInvoiceButtons}
          {outgoingInvoice && (
            <div className="flex flex-col items-center absolute w-full mt-8 -ml-4">
              <Separator className="h-[1px] w-full" />

              <p className="text-muted-foreground py-4">{`You requested ${outgoingInvoice.data.amount.originalValue} sats${outgoingInvoice.data.memo ? ` for ${outgoingInvoice.data.memo}` : ""}.`}</p>
            </div>
          )}
          {!incomingInvoice && !outgoingInvoice && sendAndRequestButtons}
        </CardFooter>
      </>
    );
  };

  if (error) {
    return (
      <Card className="h-full w-full">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-center text-lg font-bold">
            Something went wrong
          </h1>
          <p className="text-center text-sm mb-4">{error}</p>
          <Button variant="outline" onClick={login}>
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  if (!wallet || progress.percentage < 100) {
    return (
      <Card className="h-full w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <p className="text-center text-sm mb-4">{progress.message}</p>
          <Progress value={progress.percentage} className="w-[60%]" />
        </div>
      </Card>
    );
  }

  let content;
  switch (wallet?.status) {
    case WalletStatus.NOT_SETUP:
    case WalletStatus.DEPLOYING:
    case WalletStatus.DEPLOYED:
    case WalletStatus.INITIALIZING:
      setupWallet(wallet);
      break;
    case WalletStatus.READY:
    case WalletStatus.UNAVAILABLE:
    case WalletStatus.TERMINATING:
    case WalletStatus.TERMINATED:
      content = <ReadyWallet />;
      break;
    case WalletStatus.FAILED:
    default:
      content = "Something went wrong :-(";
      break;
  }

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Card className="h-full w-full">{content}</Card>
        <DialogContent className="sm:max-w-[462px]">
          {modalContent}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Wallet;
